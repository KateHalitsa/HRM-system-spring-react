package com.example.springcursework.model;

import java.io.Serializable;
import java.util.Objects;

public class EmployeeEfficiencyCellKey implements Serializable {
    private Integer workplaceId;
    private Integer employeeId;

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

    public EmployeeEfficiencyCellKey(Integer workplaceId, Integer groupScheduleId) {
        this.workplaceId = workplaceId;
        this.employeeId = groupScheduleId;
    }

    public EmployeeEfficiencyCellKey() {
    }

    @Override
    public boolean equals(Object o) {
        if ( this == o ) {
            return true;
        }
        if ( o == null || getClass() != o.getClass() ) {
            return false;
        }
        EmployeeEfficiencyCellKey pk = (EmployeeEfficiencyCellKey) o;
        return Objects.equals(workplaceId, pk.workplaceId) &&
                Objects.equals(employeeId, pk.employeeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(workplaceId, employeeId);
    }

}
