package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "subject")
public class Z_Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column
    private String name;

    @Column
    private String description;




    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }



    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return "Z_Subject [id=" + id + ", name=" + name +", description=" + description +"]";
    }
}
