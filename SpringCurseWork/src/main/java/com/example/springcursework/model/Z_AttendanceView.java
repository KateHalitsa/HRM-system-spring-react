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
      (SELECT a.id FROM attendance a WHERE a.student_id = s.id AND a.group_schedule_id = gs.id) attendance_id,
      gs.id group_schedule_id,
      sg.student_id,
      s.name student_name    
    FROM group_schedule AS gs, `group` AS g, student_group sg, student s
    WHERE gs.group_id = g.id AND sg.group_id = g.id  AND sg.student_id = s.id
    ORDER BY s.name, gs.start_time  
    """)
@IdClass(Z_AttendanceViewKey.class)
public class Z_AttendanceView {
/*    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key
*/
    @Column(name = "attendance_id")
    private Integer attendanceId;

    @Id
    @Column(name = "group_schedule_id")
    private Integer groupScheduleId;

    @Id
    @Column(name = "student_id")
    private Integer studentId;

    @Column(name = "student_name")
    private String studentName;

    @Transient()
    private boolean isChecked;

    public Integer getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(Integer attendanceId) {
        this.attendanceId = attendanceId;
    }

    public Integer getGroupScheduleId() {
        return groupScheduleId;
    }

    public void setGroupScheduleId(Integer groupScheduleId) {
        this.groupScheduleId = groupScheduleId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public boolean getIsChecked() {
        return isChecked;
    }

    public void setIsChecked(boolean checked) {
        isChecked = checked;
    }

    /* @Override
    public String toString() {
        return "Z_GroupGeneralView [id=" + id + ", name=" + name +  "]";
    } */
}
