package com.example.springcursework.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import java.time.LocalDateTime;

//@Data
@Entity
@Immutable
// language=sql
@Subselect
(value = """
    SELECT 
        ew.*, 
        (SELECT CONCAT(e.last_name, " ", e.first_name) FROM employee e WHERE e.id = ew.employee_id) employee_full_name, 
        (SELECT w.name FROM workplace w WHERE w.id = ew.workplace_id) workplace_name,
        (SELECT p.name FROM workplace w, project p WHERE w.id = ew.workplace_id AND p.id = w.project_id) project_name 
    FROM employee_workplace ew
    ORDER BY project_name, workplace_name, from_date, to_date 
    """)
public class EmployeeWorkplaceView {
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

    @Column(name = "employee_full_name")
    private String employeeFullName;

    @Column(name = "workplace_name")
    private String workplaceName;

    @Column(name = "project_name")
    private String projectName;


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

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public String getEmployeeFullName() {
        return employeeFullName;
    }

    public void setEmployeeFullName(String employeeFullName) {
        this.employeeFullName = employeeFullName;
    }

    public String getWorkplaceName() {
        return workplaceName;
    }

    public void setWorkplaceName(String workplaceName) {
        this.workplaceName = workplaceName;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    @Override
    public String toString() {
        return "EmployeeWorkplaceView [id=" + id + ", employeeId=" + employeeId + ", workplaceId=" + workplaceId +
                ", fromDate=" + fromDate + ", toDate=" + toDate + ", approved=" + approved + "]";
    }

}
