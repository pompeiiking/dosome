package com.ciallo.travelbackend.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class UserInput {
    public String start;
    public String end;
    public Date travelDate;
    public List<String> bigPrefs;
    public Map<String, List<String>> smallPrefs;
    public String pace;
    public String budgetType;
    public List<String> mustVisit;
    public List<String> blacklist;
    public List<String> visited;
    public List<String> targetPlaces;
} 