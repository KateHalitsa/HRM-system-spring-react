package com.example.springcursework.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class FeatureForEmployee {
    @Id
    @Column(name = "feature_id")
    private int featureId;
    @Column(name = "feature_name")
    private String featureName;

    @Column(name = "employee_feature_id")
    private Integer employeeFeatureId;
    @Column(name = "value")
    private Integer value;

    @Column(name = "employee_position_name")
    private String employeePositionName;

    public int getFeatureId() {
        return featureId;
    }

    public void setFeatureId(int featureId) {
        this.featureId = featureId;
    }

    public String getFeatureName() {
        return featureName;
    }

    public void setFeatureName(String featureName) {
        this.featureName = featureName;
    }



    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Integer getEmployeeFeatureId() {
        return employeeFeatureId;
    }

    public void setEmployeeFeatureId(Integer employeeFeatureId) {
        this.employeeFeatureId = employeeFeatureId;
    }

    public String getEmployeePositionName() {
        return employeePositionName;
    }

    public void setEmployeePositionName(String employeePositionName) {
        this.employeePositionName = employeePositionName;
    }

    @Override
    public String toString() {
        return "RoleForUser [featureId=" + featureId + ", featureName=" + featureName +
                ", employeeFeatureId=" + employeeFeatureId + ", value=" + value +
                ", employeePositionName=" + employeePositionName + "]";
    }
}
