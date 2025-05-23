package com.ciallo.travelbackend.model;

import java.util.List;

public class StopDTO {
    private String attraction; // 对应前端期望的字段名
    private String recommendedPreference; // 对应前端的推荐理由
    private String playRhythm; // 对应前端的节奏
    private String bestVisitDate; // 对应前端的最佳时间，原 bestVisitSeason
    private List<PlayItemDTO> playItems; // 修改为 PlayItemDTO 列表

    // Getters and Setters
    public String getAttraction() {
        return attraction;
    }

    public void setAttraction(String attraction) {
        this.attraction = attraction;
    }

    public String getRecommendedPreference() {
        return recommendedPreference;
    }

    public void setRecommendedPreference(String recommendedPreference) {
        this.recommendedPreference = recommendedPreference;
    }

    public String getPlayRhythm() {
        return playRhythm;
    }

    public void setPlayRhythm(String playRhythm) {
        this.playRhythm = playRhythm;
    }

    public String getBestVisitDate() {
        return bestVisitDate;
    }

    public void setBestVisitDate(String bestVisitDate) {
        this.bestVisitDate = bestVisitDate;
    }

    public List<PlayItemDTO> getPlayItems() {
        return playItems;
    }

    public void setPlayItems(List<PlayItemDTO> playItems) {
        this.playItems = playItems;
    }
} 