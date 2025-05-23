package com.ciallo.travelbackend.service;

import com.ciallo.travelbackend.model.UserInput;
import com.ciallo.travelbackend.model.Route;
import com.ciallo.travelbackend.model.RouteRecommender;
import com.ciallo.travelbackend.util.DataConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.ciallo.travelbackend.model.RecommendationResponse;
import com.ciallo.travelbackend.model.RouteDTO;
import com.ciallo.travelbackend.model.StopDTO;
import com.ciallo.travelbackend.model.PlayItemDTO;

@Service
public class TravelServiceImpl implements TravelService {
    @Autowired
    private RouteDao routeDao;

    @Override
    public RecommendationResponse recommend(UserInput input) {
        try {
            // 输出收到的用户输入信息
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
            System.out.println("收到用户输入:" + mapper.writeValueAsString(input));

            System.out.println("开始调用数据库...");
            List<Route> dbRoutes = routeDao.queryRoutes(input);
            System.out.println("数据库返回路线数: " + (dbRoutes == null ? 0 : dbRoutes.size()));
            // 输出数据库返回的原始路线信息
            System.out.println("数据库返回的原始路线:" + mapper.writeValueAsString(dbRoutes));

            System.out.println("开始进行数据合并...");
            List<Route> routes = DataConverter.merge(input, dbRoutes);
            System.out.println("数据合并完成，合并后路线数: " + (routes == null ? 0 : routes.size()));
             // 输出合并后的路线信息
            System.out.println("合并后的路线:" + mapper.writeValueAsString(routes));

            System.out.println("开始进行算法计算...");
            RouteRecommender recommender = new RouteRecommender();
            List<RouteRecommender.ScoredRoute> result = recommender.recommend(input, routes);
            System.out.println("算法计算完成，推荐结果数: " + (result == null ? 0 : result.size()));
            // 输出计算后的推荐结果
            System.out.println("计算后的推荐结果:" + mapper.writeValueAsString(result));

            System.out.println("开始包装返回信息...");
            List<RouteDTO> routeDTOs = new ArrayList<>();
            if (result != null) {
                for (RouteRecommender.ScoredRoute scoredRoute : result) {
                    Route originalRoute = scoredRoute.route; // 获取原始 Route 对象
                    RouteDTO routeDTO = new RouteDTO();
                    routeDTO.setTotalDistance(originalRoute.totalDistance);
                    routeDTO.setTotalCost(originalRoute.totalCost);
                    routeDTO.setTotalTime(originalRoute.totalTime);
                    routeDTO.setTotalScore(scoredRoute.score); // 设置总得分

                    List<StopDTO> stopDTOs = new ArrayList<>();
                    if (originalRoute.stops != null) {
                        for (com.ciallo.travelbackend.model.Stop stop : originalRoute.stops) { // 明确使用完整的 Stop 类名
                            StopDTO stopDTO = new StopDTO();
                            stopDTO.setAttraction(stop.name); // 将 name 映射到 attraction

                            // 填充推荐理由、节奏、最佳时间
                            stopDTO.setRecommendedPreference(stop.bigPref); // 使用 bigPref 作为推荐理由
                            stopDTO.setPlayRhythm("中等节奏"); // 示例填充，可根据实际数据调整
                            stopDTO.setBestVisitDate(stop.bestVisitSeason); // 使用原始的bestVisitSeason，并修改字段名以匹配前端

                            // 转换 playItems 列表 (String 列表转 PlayItemDTO 列表)
                            List<PlayItemDTO> playItemDTOs = new ArrayList<>();
                            if (stop.playItems != null) {
                                for (String item : stop.playItems) {
                                    PlayItemDTO playItemDTO = new PlayItemDTO();
                                    playItemDTO.setName(item); // 假设 String 就是 play name
                                    playItemDTO.setCategory("未知类别"); // 示例填充，需要根据实际数据获取
                                    playItemDTO.setCost(0.0); // 示例填充，需要根据实际数据获取
                                    playItemDTOs.add(playItemDTO);
                                }
                            }
                            stopDTO.setPlayItems(playItemDTOs);

                            stopDTOs.add(stopDTO);
                        }
                    }
                    routeDTO.setStops(stopDTOs);
                    routeDTOs.add(routeDTO);
                }
            }
            RecommendationResponse response = new RecommendationResponse();
            response.setPaths(routeDTOs); // 设置 paths 字段

            // 输出最终返回的响应信息
            System.out.println("最终返回的响应:" + mapper.writeValueAsString(response));

            return response;
        } catch (Exception e) {
            System.err.println("后端推荐流程异常: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("后端推荐流程异常: " + e.getMessage(), e);
        }
    }
} 