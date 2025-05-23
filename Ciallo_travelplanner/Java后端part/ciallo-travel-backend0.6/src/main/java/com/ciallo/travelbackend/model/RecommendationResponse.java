package com.ciallo.travelbackend.model;

import java.util.List;

public class RecommendationResponse {
    private List<RouteDTO> paths; // 对应前端期望的字段名

    // Getters and Setters
    public List<RouteDTO> getPaths() {
        return paths;
    }

    public void setPaths(List<RouteDTO> paths) {
        this.paths = paths;
    }
} 