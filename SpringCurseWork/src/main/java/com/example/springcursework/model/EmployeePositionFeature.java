package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employee_position_feature")
public class EmployeePositionFeature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column
    private String name;


    @Column(name = "employee_position_id")
    private Integer employeePositionId;


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
        return "EmployeePositionFeature [id=" + id + ", name=" + name +", employeePositionId="+ getEmployeePositionId() +  "]";
    }
}
