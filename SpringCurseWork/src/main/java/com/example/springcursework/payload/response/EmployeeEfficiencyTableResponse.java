package com.example.springcursework.payload.response;

import com.example.springcursework.model.Employee;
import com.example.springcursework.model.EmployeeEfficiencyCell;
import com.example.springcursework.model.Workplace;

import java.util.List;

public class EmployeeEfficiencyTableResponse {
    private List<EmployeeEfficiencyCell> cells;
    private List<Employee> employees;
    private List<Workplace> workplaces;

    public EmployeeEfficiencyTableResponse(List<EmployeeEfficiencyCell> cells, List<Employee> employees, List<Workplace> workplaces){
       this.cells = cells;
       this.employees = employees;
       this.workplaces = workplaces;
    }

    public List<EmployeeEfficiencyCell> getCells() {
        return cells;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public List<Workplace> getWorkplaces() {
        return workplaces;
    }
}
