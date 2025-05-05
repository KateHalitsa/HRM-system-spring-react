package com.example.springcursework.servise;

import com.example.springcursework.model.Employee;
import com.example.springcursework.model.EmployeePositionFeature;
import com.example.springcursework.model.FeatureForEmployee;

import java.time.LocalDateTime;
import java.util.List;

public interface EmployeeService {
    Employee insert(Employee employeeVO);

    List<Employee> findAll();

    void delete(int id);

    Employee findById(int id);

    Employee updateEmployee(int id, Employee employeeVO);

    List<FeatureForEmployee> FeaturesByEmployeeId(int id);
    List<FeatureForEmployee> updateFeaturesByEmployeeId(int employeeId, List<FeatureForEmployee> features);

    List<Employee> freeEmployeesOnDate(LocalDateTime calcOnDate);
    List<Employee> notFreeEmployeesOnDate(LocalDateTime calcOnDate);
}
