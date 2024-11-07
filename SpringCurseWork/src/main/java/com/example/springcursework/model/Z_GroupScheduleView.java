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
      gs.id,
      gs.start_time,     
      gs.group_id,
      gs.room_id,
      r.address room_address,
      r.floor room_floor,
      r.number room_number,
      g.name group_name,
      g.school_year group_school_year,
      g.teacher_id,
      s.name subject_name,
      (SELECT COUNT(*) FROM student_group sg WHERE sg.group_id = g.id) student_count,
      (SELECT COUNT(*) FROM attendance a WHERE a.group_schedule_id = gs.id) attendance_count
    FROM group_schedule as gs, `group` AS g, teacher t, subject s, room r
    WHERE gs.group_id = g.id and g.teacher_id = t.id and g.subject_id = s.id and gs.room_id = r.id
    order by gs.start_time  
    """)
public class Z_GroupScheduleView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "group_id")
    private Integer groupId;

    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "room_address")
    private String roomAddress;

    @Column(name = "room_floor")
    private Integer roomFloor;

    @Column(name = "room_number")
    private Integer roomNumber;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "group_school_year")
    private int schoolYear;

    @Column(name = "subject_name")
    private String subjectName;

    @Column(name = "teacher_id")
    private Integer teacherId;

    @Column(name = "student_count")
    private Integer studentCount;

    @Column(name = "attendance_count")
    private Integer attendanceCount;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public String getRoomAddress() {
        return roomAddress;
    }

    public void setRoomAddress(String roomAddress) {
        this.roomAddress = roomAddress;
    }

    public Integer getRoomFloor() {
        return roomFloor;
    }

    public void setRoomFloor(Integer roomFloor) {
        this.roomFloor = roomFloor;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public int getSchoolYear() {
        return schoolYear;
    }

    public void setSchoolYear(int schoolYear) {
        this.schoolYear = schoolYear;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }

    public Integer getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(Integer studentCount) {
        this.studentCount = studentCount;
    }

    public Integer getAttendanceCount() {
        return attendanceCount;
    }

    public void setAttendanceCount(Integer attendanceCount) {
        this.attendanceCount = attendanceCount;
    }

    /* @Override
    public String toString() {
        return "Z_GroupGeneralView [id=" + id + ", name=" + name +  "]";
    } */
}
