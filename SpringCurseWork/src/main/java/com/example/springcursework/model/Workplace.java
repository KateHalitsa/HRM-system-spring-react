package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workplace")
public class Workplace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column
    private String name;


    @Column(name = "employee_position_id")
    private Integer employeePositionId;
    @Column(name = "project_id")
    private Integer projectId;



    public int getId() { return id; }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name;}

    public Integer getEmployeePositionId() {
        return employeePositionId;
    }

    public void setEmployeePositionId(Integer employeePositionId) {
        this.employeePositionId = employeePositionId;
    }

    @Override
    public String toString() {
        return "Workplace [id=" + id + ", name=" + name +", employeePositionId="+ getEmployeePositionId() + ", employeePositionId="+ getProjectId() + "]";
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }
}
