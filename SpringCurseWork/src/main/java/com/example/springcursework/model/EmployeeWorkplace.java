package com.example.springcursework.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "employee_workplace")
public class EmployeeWorkplace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key
    @Column(name = "workplace_id")
    private int workplaceId;
    @Column(name = "employee_id")
    private int employeeId;
    @Column(name = "from_date")
    private LocalDateTime fromDate;
    @Column(name = "to_date")
    private LocalDateTime toDate;
    @Column
    private boolean approved;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getWorkplaceId() {
        return workplaceId;
    }

    public void setWorkplaceId(int workplaceId) {
        this.workplaceId = workplaceId;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDateTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDateTime getToDate() {
        return toDate;
    }

    public void setToDate(LocalDateTime toDate) {
        this.toDate = toDate;
    }

    public boolean getApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    @Override
    public String toString() {
        return "EmployeeWorkplace [id=" + id + ", employeeId=" + employeeId + ", workplaceId=" + workplaceId +
                ", fromDate=" + fromDate + ", toDate=" + toDate + ", approved=" + approved + "]";
    }

}
