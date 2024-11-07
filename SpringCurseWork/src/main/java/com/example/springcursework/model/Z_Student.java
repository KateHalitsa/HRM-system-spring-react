package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student")
public class Z_Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column
    private String name;
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

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId;}

    @Override
    public String toString() {
        return "Z_Student [id=" + id + ", name=" + name +  "]";
    }
}
