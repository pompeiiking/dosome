package com.ciallo.travelbackend.model;

import java.util.List;

public class RouteDTO {
    private List<StopDTO> stops; // 使用 StopDTO
    private double totalDistance;
    private double totalCost;
    private double totalTime;
    private double totalScore; // 添加总得分字段
    // 可以根据需要添加评分或其他信息

    // Getters and Setters
    public List<StopDTO> getStops() {
        return stops;
    }

    public void setStops(List<StopDTO> stops) {
        this.stops = stops;
    }

    public double getTotalDistance() {
        return totalDistance;
    } 

    public void setTotalDistance(double totalDistance) {
        this.totalDistance = totalDistance;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public double getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(double totalTime) {
        this.totalTime = totalTime;
    }

    public double getTotalScore() { // 添加 totalScore 的 getter
        return totalScore;
    }

    public void setTotalScore(double totalScore) { // 添加 totalScore 的 setter
        this.totalScore = totalScore;
    }
} 