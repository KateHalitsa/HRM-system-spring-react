package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "room")
public class Z_Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key
    @Column
    private String address;
    @Column
    private int floor;
    @Column
    private int number;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
    @Override
    public String toString() {
        return "Z_Room [id=" + id + ", address=" + address +", floor=" + floor + ", number=" + number + "]";
    }
}
