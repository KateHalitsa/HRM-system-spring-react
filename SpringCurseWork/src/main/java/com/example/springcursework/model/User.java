package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column
    private String login;
    @Column
    private String password;
    @Column
    private String email;

    @Column(name = "employee_id")
    private Integer employeeId;

    public int getId() { return id; }
    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login;}

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password;}

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email;}

    public Integer getEmployeeId() { return employeeId; }
    public void setEmployeeId(Integer employeeId) { this.employeeId = employeeId; }

    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + login +  "]";
    }

}
