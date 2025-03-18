package com.example.springcursework.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class ProjectEfficiency {
    @Column(name = "project_name")
    private String projectName;
    @Id
    @Column(name = "total_effectiveness")
    private Double totalEffectiveness;

    // Конструкторы, геттеры и сеттеры
    public ProjectEfficiency(String projectName, Double totalEffectiveness) {
        this.projectName = projectName;
        this.totalEffectiveness = totalEffectiveness;
    }

    public ProjectEfficiency() {

    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public Double getTotalEffectiveness() {
        return totalEffectiveness;
    }

    public void setTotalEffectiveness(Double totalEffectiveness) {
        this.totalEffectiveness = totalEffectiveness;
    }
  /*  String getProjectName();
    Double getTotalEffectiveness();*/
}
