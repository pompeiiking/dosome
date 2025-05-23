package com.ciallo.travelbackend.service;

import com.ciallo.travelbackend.model.UserInput;
import com.ciallo.travelbackend.model.Route;
import com.ciallo.travelbackend.model.Stop;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class RouteDaoMockImpl implements RouteDao {
    @Override
    public List<Route> queryRoutes(UserInput input) {
        // 构造一个mock Route
        Route route = new Route();
        Stop stop = new Stop();
        stop.name = "故宫博物院";
        stop.bestVisitSeason = "4月-9月";
        stop.bigPref = "历史文化";
        stop.playItems = Arrays.asList("参观宫殿", "观看文物展览", "摄影打卡");
        route.stops = new ArrayList<>();
        route.stops.add(stop);
        route.totalCost = 0.0;
        route.totalDistance = 2.0;
        route.totalTime = 3.0;
        List<Route> routes = new ArrayList<>();
        routes.add(route);
        return routes;
    }
} 