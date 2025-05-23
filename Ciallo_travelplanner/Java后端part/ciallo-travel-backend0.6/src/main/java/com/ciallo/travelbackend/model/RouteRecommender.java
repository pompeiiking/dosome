package com.ciallo.travelbackend.model;

import java.util.*;

public class RouteRecommender {
    // 带评分的路线结构
    public static class ScoredRoute {
        public Route route; // 路线本身
        public double score; // 路线总分
        public double distanceScore; // 距离得分
        public double costScore; // 花费得分
        public double preferenceScore; // 偏好得分
        public double timeScore; // 时间适宜性得分
        public double bonus; // 高级选项加减分
    }

    // 主推荐方法，输入用户信息和所有可行路线，输出带评分的路线列表
    public List<ScoredRoute> recommend(UserInput user, List<Route> routes) {
        double maxDist = routes.stream().mapToDouble(r -> r.totalDistance).max().orElse(1);
        double minDist = routes.stream().mapToDouble(r -> r.totalDistance).min().orElse(0);
        double maxCost = routes.stream().mapToDouble(r -> r.totalCost).max().orElse(1);
        double minCost = routes.stream().mapToDouble(r -> r.totalCost).min().orElse(0);

        List<ScoredRoute> scoredRoutes = new ArrayList<>();
        for (Route route : routes) {
            ScoredRoute sr = new ScoredRoute();
            sr.route = route;
            sr.distanceScore = (maxDist - route.totalDistance) / (maxDist - minDist + 1e-6);
            sr.costScore = (maxCost - route.totalCost) / (maxCost - minCost + 1e-6);
            sr.preferenceScore = calcPreferenceScore(user, route);
            sr.timeScore = calcTimeScore(user, route);
            sr.bonus = calcBonus(user, route);
            double[] weights = getWeights(user.pace, user.budgetType);
            sr.score = sr.distanceScore * weights[0] + sr.costScore * weights[1] + sr.preferenceScore * 0.2 + sr.timeScore * 0.1 + sr.bonus * 0.1;
            scoredRoutes.add(sr);
        }
        scoredRoutes.sort((a, b) -> Double.compare(b.score, a.score));
        return scoredRoutes;
    }

    private double calcPreferenceScore(UserInput user, Route route) {
        Map<String, Double> bigPrefScore = new HashMap<>();
        for (String bigPref : user.bigPrefs) {
            List<String> smalls = user.smallPrefs.getOrDefault(bigPref, new ArrayList<>());
            int n = smalls.size();
            double sumW = n * (n + 1) / 2.0;
            double score = 0;
            for (int i = 0; i < n; i++) {
                String small = smalls.get(i);
                double w = (n - i) / sumW;
                boolean matched = route.stops.stream().anyMatch(s -> s.bigPref.equals(bigPref) && s.playItems.contains(small));
                score += w * (matched ? 1.0 : 0.5);
            }
            bigPrefScore.put(bigPref, score);
        }
        List<Map.Entry<String, Double>> sorted = new ArrayList<>(bigPrefScore.entrySet());
        sorted.sort((a, b) -> Double.compare(b.getValue(), a.getValue()));
        double sum = sorted.stream().mapToDouble(Map.Entry::getValue).sum();
        if (sum == 0) sum = user.bigPrefs.size();
        double total = 0;
        for (int i = 0; i < sorted.size(); i++) {
            double w = sorted.get(i).getValue() / sum;
            total += w * sorted.get(i).getValue();
        }
        return total;
    }

    private double calcTimeScore(UserInput user, Route route) {
        double total = 0;
        int count = 0;
        Calendar cal = Calendar.getInstance();
        cal.setTime(user.travelDate);
        int userMonth = cal.get(Calendar.MONTH) + 1;
        for (Stop stop : route.stops) {
            double s = 0;
            if (stop.bestVisitSeason.equals("全年")) {
                s = 1.0;
            } else {
                String[] parts = stop.bestVisitSeason.split("-");
                int start = Integer.parseInt(parts[0].replaceAll("\\D", ""));
                int end = Integer.parseInt(parts[1].replaceAll("\\D", ""));
                int diff = Math.min(Math.abs(userMonth - start), Math.abs(userMonth - end));
                if (userMonth >= start && userMonth <= end) {
                    s = 1.0;
                } else if (diff == 1) {
                    s = 0.8;
                } else if (diff == 2) {
                    s = 0.6;
                } else if (diff == 3) {
                    s = 0.4;
                } else {
                    s = 0.0;
                }
            }
            total += s;
            count++;
        }
        return count == 0 ? 0 : total / count;
    }

    private double calcBonus(UserInput user, Route route) {
        double bonus = 0;
        Set<String> allStops = new HashSet<>();
        for (Stop s : route.stops) allStops.add(s.name);
        for (String must : user.mustVisit) if (allStops.contains(must)) bonus += 0.05;
        for (String t : user.targetPlaces) if (allStops.contains(t)) bonus += 0.05;
        for (String b : user.blacklist) if (allStops.contains(b)) bonus -= 0.05;
        for (String v : user.visited) if (allStops.contains(v)) bonus -= 0.05;
        if (bonus > 0.2) bonus = 0.2;
        if (bonus < -0.2) bonus = -0.2;
        return bonus;
    }

    private double[] getWeights(String pace, String budgetType) {
        if ("快".equals(pace)) return new double[]{0.4, 0.2};
        if ("慢".equals(pace)) return new double[]{0.2, 0.4};
        return new double[]{0.3, 0.3};
    }
} 