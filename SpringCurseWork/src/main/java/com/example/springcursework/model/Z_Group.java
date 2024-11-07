package com.example.springcursework.model;

import jakarta.persistence.*;

@Entity
@Table(name = "`group`")
public class Z_Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column
    private String name;

    @Column
    private int age;

    @Column(name = "school_year")
    private int schoolYear;

    @Column(name = "subject_id")
    private Integer subjectId;

    @Column(name = "teacher_id")
    private Integer teacherId;


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }

    public int getSchoolYear() {
        return schoolYear;
    }
    public void setSchoolYear(int schoolYear) {
        this.schoolYear = schoolYear;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Integer getSubjectId() { return subjectId; }
    public void setSubjectId(Integer subjectId) { this.subjectId = subjectId;}

    public Integer getTeacherId() { return teacherId; }
    public void setTeacherId(Integer teacherId) { this.teacherId = teacherId;}

    @Override
    public String toString() {
        return "Z_Group [id=" + id + ", name=" + name +  "]";
    }
}
