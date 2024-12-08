package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeeWorkplace;
import com.example.springcursework.model.EmployeeWorkplaceView;

import java.util.List;

public interface EmployeeWorkplaceService {
    EmployeeWorkplace insert(EmployeeWorkplace employeeVO);

    List<EmployeeWorkplace> findAll();

    void delete(int id);

    EmployeeWorkplace findById(int id);

    EmployeeWorkplace updateEmployeeWorkplace(int id, EmployeeWorkplace employeeVO);

    List<EmployeeWorkplace> insertContacts(List<EmployeeWorkplace> contracts);

    List<EmployeeWorkplaceView> view();

    List<EmployeeWorkplaceView> history(int employeeId);
}
