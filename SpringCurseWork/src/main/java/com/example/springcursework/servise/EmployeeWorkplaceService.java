package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeePosition;
import com.example.springcursework.model.EmployeeWorkplace;

import java.util.List;

public interface EmployeeWorkplaceService {
    EmployeeWorkplace insert(EmployeeWorkplace employeeVO);

    public List<EmployeeWorkplace> findAll();

    public void delete(int id);

    public EmployeeWorkplace findById(int id);

    //public List<EmployeeWorkplace> findByNamePart(String namePart);

    public EmployeeWorkplace updateEmployeeWorkplace(int id, EmployeeWorkplace employeeVO);

    public List<EmployeeWorkplace> insertContacts(List<EmployeeWorkplace> contracts);
}
