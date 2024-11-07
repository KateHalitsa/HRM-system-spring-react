package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "teacher")
public class Z_Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column
    private String name;
    @Column
    private String education;
    @Column
    private String description;

    @Column(name = "user_id")
    private Integer userId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEducation() {
        return education;
    }
    public void setEducation(String education) {
        this.education = education;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId;}

    @Override
    public String toString() {
        return "Z_Teacher [id=" + id + ", name=" + name +  "]";
    }
}
