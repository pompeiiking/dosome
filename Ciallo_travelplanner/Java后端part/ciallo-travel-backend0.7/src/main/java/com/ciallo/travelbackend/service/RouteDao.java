package com.ciallo.travelbackend.service;

import com.ciallo.travelbackend.model.UserInput;
import com.ciallo.travelbackend.model.Route;
import java.util.List;
 
// 可有多种实现：Mock实现、数据库实现
public interface RouteDao {
    List<Route> queryRoutes(UserInput input);
} 