package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Attendance;
import com.example.springcursework.model.Z_AttendanceView;

import java.util.List;

public interface Z_AttendanceService {
    public Z_Attendance insert(Z_Attendance attendanceVO);

    public List<Z_Attendance> findAll();

    public void delete(int id);

    public Z_Attendance findById(int id);

    public Z_Attendance updateAttendance(int id, Z_Attendance attendanceVO);

    List<Z_AttendanceView> findByGroupScheduleId(int groupScheduleId);

    List<Z_AttendanceView> updateAttendances(int groupScheduleId, List<Z_AttendanceView> attendances);
}
