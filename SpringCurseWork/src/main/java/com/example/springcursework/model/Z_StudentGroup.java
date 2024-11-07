package com.example.springcursework.model;

import jakarta.persistence.*;


@Entity
@Table(name = "student_group")
public class Z_StudentGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column(name = "student_id")
    private Integer studentId;

    @Column(name = "group_id")
    private Integer groupId;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }



   /* @Override
    public String toString() {
        return "Z_GroupSchedule [id=" + id + ", name=" + name +  "]";
    } */
}
