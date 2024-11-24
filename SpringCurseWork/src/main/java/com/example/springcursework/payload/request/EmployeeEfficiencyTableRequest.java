package com.example.springcursework.payload.request;

import com.example.springcursework.model.EmployeeEfficiencyCell;

import java.util.List;

public class EmployeeEfficiencyTableRequest {
    private List<EmployeeEfficiencyCell> cells;
    private List<Integer> employeeIds;
    private List<Integer> workplaceIds;

    public EmployeeEfficiencyTableRequest(List<EmployeeEfficiencyCell> cells, List<Integer> employeeIds, List<Integer> workplaceIds){
       this.setCells(cells);
       this.setEmployeeIds(employeeIds);
       this.setWorkplaceIds(workplaceIds);
    }

    public List<EmployeeEfficiencyCell> getCells() {
        return cells;
    }

    public void setCells(List<EmployeeEfficiencyCell> cells) {
        this.cells = cells;
    }

    public List<Integer> getEmployeeIds() {
        return employeeIds;
    }

    public void setEmployeeIds(List<Integer> employeeIds) {
        this.employeeIds = employeeIds;
    }

    public List<Integer> getWorkplaceIds() {
        return workplaceIds;
    }

    public void setWorkplaceIds(List<Integer> workplaceIds) {
        this.workplaceIds = workplaceIds;
    }
}
