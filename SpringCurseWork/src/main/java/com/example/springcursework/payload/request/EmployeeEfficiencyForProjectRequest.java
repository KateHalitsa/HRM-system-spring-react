package com.example.springcursework.payload.request;

import java.time.LocalDateTime;

public class EmployeeEfficiencyForProjectRequest {
    private int projectId;
    private LocalDateTime calcOnDate;

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public LocalDateTime getCalcOnDate() {
        return calcOnDate;
    }

    public void setCalcOnDate(LocalDateTime calcOnDate) {
        this.calcOnDate = calcOnDate;
    }
}
