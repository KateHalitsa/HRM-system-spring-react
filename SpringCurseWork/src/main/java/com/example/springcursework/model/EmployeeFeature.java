package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employee_feature")
public class EmployeeFeature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key
    @Column(name = "feature_id")
    private int featureId;
    @Column(name = "employee_id")
    private int employeeId;
    @Column(name = "value")
    private int value;



    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }



    @Override
    public String toString() {
        return "WorkplaceFeature [id=" + id + ", featureId=" + featureId + ", employeeId=" + employeeId +", value=" + value +"]";
    }

    public int getFeatureId() {
        return featureId;
    }

    public void setFeatureId(int featureId) {
        this.featureId = featureId;
    }


    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
