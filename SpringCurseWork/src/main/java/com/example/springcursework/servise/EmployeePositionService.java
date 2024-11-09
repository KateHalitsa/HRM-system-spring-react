package com.example.springcursework.servise;

import com.example.springcursework.model.Employee;
import com.example.springcursework.model.EmployeePosition;

import java.util.List;

public interface EmployeePositionService {
    EmployeePosition insert(EmployeePosition employeeVO);

    public List<EmployeePosition> findAll();

    public void delete(int id);

    public EmployeePosition findById(int id);

    public List<EmployeePosition> findByNamePart(String namePart);

    public EmployeePosition updateEmployeePosition(int id, EmployeePosition employeeVO);
}
