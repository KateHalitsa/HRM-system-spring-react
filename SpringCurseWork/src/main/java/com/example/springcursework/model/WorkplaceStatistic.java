package com.example.springcursework.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class WorkplaceStatistic {


    @Id
    @Column(name = "id")
    private int workplaceCount;
    @Column(name = "name")
    private String positionName;
    public WorkplaceStatistic(String positionName, int workplaceCount) {
        this.positionName = positionName;
        this.workplaceCount = workplaceCount;
    }

    public WorkplaceStatistic() {

    }

    // Геттеры и сеттеры
    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public int getWorkplaceCount() {
        return workplaceCount;
    }

    public void setWorkplaceCount(int workplaceCount) {
        this.workplaceCount = workplaceCount;
    }
}
