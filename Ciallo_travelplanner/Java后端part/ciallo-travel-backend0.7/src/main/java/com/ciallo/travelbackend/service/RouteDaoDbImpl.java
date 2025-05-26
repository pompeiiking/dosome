package com.ciallo.travelbackend.service;

import com.ciallo.travelbackend.model.Route;
import com.ciallo.travelbackend.model.Stop;
import com.ciallo.travelbackend.model.UserInput;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.*;

@Repository
public class RouteDaoDbImpl implements RouteDao {
    @Value("${spring.datasource.url}")
    private String dbUrl;
    @Value("${spring.datasource.username}")
    private String dbUser;
    @Value("${spring.datasource.password}")
    private String dbPassword;

    @Override
    public List<Route> queryRoutes(UserInput input) {
        List<Route> routes = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword)) {
            // 1. 加载景点ID映射
            Map<String, Integer> nameToId = loadAttractionIdMap(conn);
            Map<Integer, String> idToName = loadAttractionNameMap(conn);
            Map<Integer, List<Integer>> adjList = buildAdjacencyList(conn, nameToId);
            // 2. 路径查找
            List<List<Integer>> paths = findPathsFor(conn, nameToId, idToName, adjList, input.start, input.end);
            // 3. 路径转Route结构
            for (List<Integer> path : paths) {
                Route route = new Route();
                List<Stop> stops = new ArrayList<>();
                for (int id : path) {
                    Stop stop = new Stop();
                    stop.name = idToName.get(id);
                    // 查询并填充stop的其他字段
                    fillStopDetails(conn, stop, id);
                    stops.add(stop);
                }
                route.stops = stops;
                // 可根据需要计算totalDistance/totalCost/totalTime
                routes.add(route);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return routes;
    }

    private Map<String, Integer> loadAttractionIdMap(Connection conn) throws SQLException {
        Map<String, Integer> map = new HashMap<>();
        String sql = "SELECT id, attraction FROM scenic_spots";
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                map.put(rs.getString("attraction"), rs.getInt("id"));
            }
        }
        return map;
    }
    private Map<Integer, String> loadAttractionNameMap(Connection conn) throws SQLException {
        Map<Integer, String> map = new HashMap<>();
        String sql = "SELECT id, attraction FROM scenic_spots";
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                map.put(rs.getInt("id"), rs.getString("attraction"));
            }
        }
        return map;
    }
    private Map<Integer, List<Integer>> buildAdjacencyList(Connection conn, Map<String, Integer> nameToId) throws SQLException {
        Map<Integer, List<Integer>> adjList = new HashMap<>();
        String sql = "SELECT ss.id AS scenic_id, ns.nearby_scenic_name " +
                "FROM scenic_spots ss " +
                "JOIN scenic_nearby_relation snr ON ss.id = snr.scenic_id " +
                "JOIN nearby_spots ns ON snr.nearby_id = ns.id";
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                int scenicId = rs.getInt("scenic_id");
                String nearbyName = rs.getString("nearby_scenic_name");
                Integer nearbyId = nameToId.get(nearbyName);
                if (nearbyId != null) {
                    adjList.computeIfAbsent(scenicId, k -> new ArrayList<>()).add(nearbyId);
                }
            }
        }
        return adjList;
    }
    private List<List<Integer>> findPathsFor(Connection conn, Map<String, Integer> nameToId, Map<Integer, String> idToName, Map<Integer, List<Integer>> adjList, String startName, String endName) {
        int startId = nameToId.getOrDefault(startName, -1);
        int endId = nameToId.getOrDefault(endName, -1);
        if (startId == -1 || endId == -1) return Collections.emptyList();
        return findAllPaths(startId, endId, adjList);
    }
    private List<List<Integer>> findAllPaths(int startId, int endId, Map<Integer, List<Integer>> adjList) {
        List<List<Integer>> paths = new ArrayList<>();
        dfs(startId, endId, adjList, new HashSet<>(), new ArrayList<>(), paths, 0);
        return paths;
    }
    private static final int MAX_PATH_DEPTH = 10;
    private void dfs(int currentId, int endId, Map<Integer, List<Integer>> adjList, Set<Integer> visited, List<Integer> path, List<List<Integer>> paths, int depth) {
        if (depth > MAX_PATH_DEPTH) return;
        visited.add(currentId);
        path.add(currentId);
        if (currentId == endId) {
            paths.add(new ArrayList<>(path));
        } else {
            for (Integer neighbor : adjList.getOrDefault(currentId, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    dfs(neighbor, endId, adjList, visited, path, paths, depth + 1);
                }
            }
        }
        visited.remove(currentId);
        path.remove(path.size() - 1);
    }
    private void fillStopDetails(Connection conn, Stop stop, int attractionId) throws SQLException {
        // 查询景点基本信息
        String sql = "SELECT best_date, travel_preferences, experience_pace FROM scenic_spots WHERE id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, attractionId);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    stop.bestVisitSeason = rs.getString("best_date");
                    stop.bigPref = rs.getString("travel_preferences");
                    // 可根据需要填充更多字段
                }
            }
        }
        // 查询游玩项目
        List<String> playItems = new ArrayList<>();
        String sql2 = "SELECT at.activity_name FROM scenic_activity_relation sar JOIN activity_types at ON sar.activity_id = at.id WHERE sar.scenic_id = ?";
        try (PreparedStatement pstmt = conn.prepareStatement(sql2)) {
            pstmt.setInt(1, attractionId);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    playItems.add(rs.getString("activity_name"));
                }
            }
        }
        stop.playItems = playItems;
    }
} 