package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeePosition;
import com.example.springcursework.model.ProjectEfficiency;
import com.example.springcursework.model.WorkplaceStatistic;

import java.util.List;

public interface EmployeePositionService {
    EmployeePosition insert(EmployeePosition employeeVO);

    List<EmployeePosition> findAll();

    void delete(int id);

    EmployeePosition findById(int id);

    EmployeePosition updateEmployeePosition(int id, EmployeePosition employeeVO);
    List<WorkplaceStatistic> getWorkplaceStatistics();

}
