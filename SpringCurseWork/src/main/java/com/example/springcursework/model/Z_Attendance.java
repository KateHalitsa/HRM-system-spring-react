package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "attendance")
public class Z_Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column(name = "student_id")
    private Integer studentId;

    @Column(name = "group_schedule_id")
    private Integer groupScheduleId;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public Integer getStudentId() { return studentId; }
    public void setStudentId(Integer studentId) { this.studentId = studentId;}

    public Integer getGroupScheduleId() { return groupScheduleId; }
    public void setGroupScheduleId(Integer groupScheduleId) { this.groupScheduleId = groupScheduleId;}

   /* @Override
    public String toString() {
        return "Z_Attendance [id=" + id + ", name=" + name +  "]";
    } */
}
