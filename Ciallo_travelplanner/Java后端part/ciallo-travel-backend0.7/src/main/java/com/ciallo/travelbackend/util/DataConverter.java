package com.ciallo.travelbackend.util;

import com.ciallo.travelbackend.model.UserInput;
import com.ciallo.travelbackend.model.Route;
import com.ciallo.travelbackend.model.Stop;
import java.util.*;

public class DataConverter {
    // 合并用户输入和数据库路线，补全缺失字段
    public static List<Route> merge(UserInput user, List<Route> dbRoutes) {
        List<Route> result = new ArrayList<>();
        for (Route route : dbRoutes) {
            if (route.stops == null) route.stops = new ArrayList<>();
            if (Double.isNaN(route.totalCost)) route.totalCost = 0.0;
            if (Double.isNaN(route.totalDistance)) route.totalDistance = 0.0;
            if (Double.isNaN(route.totalTime)) route.totalTime = 0.0;
            // 补全每个stop
            for (Stop stop : route.stops) {
                if (stop.playItems == null) stop.playItems = new ArrayList<>();
                if (stop.bestVisitSeason == null) stop.bestVisitSeason = "全年";
                if (stop.bigPref == null) stop.bigPref = "未知";
            }
            result.add(route);
        }
        return result;
    }
} 