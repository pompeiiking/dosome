package com.ciallo.travelbackend.service;

import com.ciallo.travelbackend.model.UserInput;
import com.ciallo.travelbackend.model.RecommendationResponse;

public interface TravelService {
    RecommendationResponse recommend(UserInput input);
} 