package com.example.springcursework.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(EmployeeEfficiencyCellKey.class)
public class EmployeeEfficiencyCell {

    @Id
    @Column(name = "workplace_id")
    private Integer workplaceId;

    @Id
    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "efficiency")
    private Integer efficiency;

    public Integer getWorkplaceId() {
        return workplaceId;
    }

    public void setWorkplaceId(Integer workplaceId) {
        this.workplaceId = workplaceId;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public Integer getEfficiency() {
        return efficiency;
    }

    public void setEfficiency(Integer efficiency) {
        this.efficiency = efficiency;
    }

    @Override
    public String toString() {
        return "RoleForUser [workplaceId=" + getWorkplaceId() + ", employeeId=" + getEmployeeId() + ", efficiency=" + getEfficiency() + "]";
    }
}
