package com.example.springcursework.model;

import jakarta.persistence.*;


@Entity
@Table(name = "teacher_subject")
public class Z_TeacherSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

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

    public Integer getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Integer subjectId) {
        this.subjectId = subjectId;
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }


   /**/ @Override
    public String toString() {
        return "Z_GroupSchedule [id=" + id + ", subjectId=" + subjectId +", teacherId=" + teacherId +  "]";
    }
}
