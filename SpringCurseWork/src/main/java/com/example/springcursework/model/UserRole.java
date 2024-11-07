package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_role")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key
    @Column(name = "role_id")
    private int roleId;
    @Column(name = "user_id")
    private int userId;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public int getRoleId() { return roleId; }
    public void setRoleId(int roleId) {this.roleId = roleId; }

    public int getUserId() { return userId;}
    public void setUserId(int userId) {this.userId = userId; }

    @Override
    public String toString() {
        return "UserRole [id=" + id + ", userId=" + userId + ", roleId=" + roleId +"]";
    }

}
