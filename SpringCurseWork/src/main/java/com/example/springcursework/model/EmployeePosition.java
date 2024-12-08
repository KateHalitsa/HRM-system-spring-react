package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employee_position")
public class EmployeePosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key
    @Column(name = "name")
    private String name;


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() { return name; }
    public void setName(String firstName) { this.name = firstName; }



    public String getFullName(){
        return name;
    }

    @Override
    public String toString() {
        return "Employee [id=" + id + ", name=" + name +"]";
    }

}
