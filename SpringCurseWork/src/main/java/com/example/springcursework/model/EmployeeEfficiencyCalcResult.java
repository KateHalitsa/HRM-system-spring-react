package com.example.springcursework.model;

import java.util.List;

public class EmployeeEfficiencyCalcResult {
    private List<EmployeeWorkplace> employeeWorkplaces;
    private int totalEfficiency;

    public EmployeeEfficiencyCalcResult(List<EmployeeWorkplace> employeeWorkplaces, int totalEfficiency) {
        this.employeeWorkplaces = employeeWorkplaces;
        this.totalEfficiency = totalEfficiency;
    }

    // Геттеры
    public List<EmployeeWorkplace> getEmployeeWorkplaces() {
        return employeeWorkplaces;
    }

    public int getTotalEfficiency() {
        return totalEfficiency;
    }
}
