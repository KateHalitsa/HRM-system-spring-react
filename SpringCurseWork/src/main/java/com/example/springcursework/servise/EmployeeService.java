package com.example.springcursework.servise;

import com.example.springcursework.model.Employee;

import java.util.List;

public interface EmployeeService {
    Employee insert(Employee employeeVO);

    public List<Employee> findAll();

    public void delete(int id);

    public Employee findById(int id);

    public List<Employee> findByNamePart(String namePart);

    public Employee updateEmployee(int id, Employee employeeVO);
}
