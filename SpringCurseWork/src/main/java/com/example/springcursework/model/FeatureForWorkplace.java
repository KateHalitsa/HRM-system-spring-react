package com.example.springcursework.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class FeatureForWorkplace {
    @Id
    @Column(name = "feature_id")
    private int featureId;
    @Column(name = "feature_name")
    private String featureName;

    @Column(name = "workplace_feature_id")
    private Integer workplaceFeatureId;
    @Column(name = "weight")
    private Integer weight;

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

    public Integer getWorkplaceFeatureId() {
        return workplaceFeatureId;
    }

    public void setWorkplaceFeatureId(Integer workplaceFeatureId) {
        this.workplaceFeatureId = workplaceFeatureId;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
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
                ", workplaceFeatureId=" + workplaceFeatureId + ", weight=" + weight +
                ", employeePositionName=" + employeePositionName +
                "]";
    }

}
