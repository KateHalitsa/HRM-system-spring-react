package com.example.springcursework.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

//@Data
@Entity
@Immutable
// language=sql
@Subselect
(value = """    
    SELECT
      g.id,
      g.name,
      g.age,
      g.school_year,
      t.name teacher_name,
      s.name subject_name
    FROM `group` AS g, teacher t, subject s
    WHERE g.teacher_id = t.id and g.subject_id = s.id
    order by g.name, g.school_year  
    """)
public class Z_GroupGeneralView {
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

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "teacher_name")
    private String teacherName;


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

    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName;}

    public String getTeacherName() { return teacherName; }
    public void setTeacherName(String teacherName) { this.teacherName = teacherName;}

    @Override
    public String toString() {
        return "Z_GroupGeneralView [id=" + id + ", name=" + name +  "]";
    }
}
