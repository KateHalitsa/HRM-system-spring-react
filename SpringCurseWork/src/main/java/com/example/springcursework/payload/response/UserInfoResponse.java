package com.example.springcursework.payload.response;

import java.util.List;

public class UserInfoResponse {
    private int id;
    private String username;
    private String email;
    private int employeeId;
    private List<String> roles;

    public UserInfoResponse(int id, String username, String email, int employeeId, List<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.setEmployeeId(employeeId);
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {  this.id = id; }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }
}

