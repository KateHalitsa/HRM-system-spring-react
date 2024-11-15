package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workplace_feature")
public class WorkplaceFeature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key
    @Column(name = "feature_id")
    private int featureId;
    @Column(name = "workplace_id")
    private int workplaceId;
    @Column(name = "weight")
    private int weight;



    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }



    @Override
    public String toString() {
        return "WorkplaceFeature [id=" + id + ", featureId=" + featureId + ", workplaceId=" + workplaceId +", weight=" + weight +"]";
    }

    public int getFeatureId() {
        return featureId;
    }

    public void setFeatureId(int featureId) {
        this.featureId = featureId;
    }

    public int getWorkplaceId() {
        return workplaceId;
    }

    public void setWorkplaceId(int workplaceId) {
        this.workplaceId = workplaceId;
    }

    public int getWeight() {

        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}
