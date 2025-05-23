package com.ciallo.travelbackend.service;

import com.ciallo.travelbackend.model.UserInput;
import com.ciallo.travelbackend.model.Route;
import java.util.List;
 
public interface RouteDao {
    List<Route> queryRoutes(UserInput input);
} 