package com.example.springcursework.servise;

import com.example.springcursework.model.Z_GroupSchedule;
import com.example.springcursework.model.Z_GroupScheduleStudentView;
import com.example.springcursework.model.Z_GroupScheduleView;

import java.util.List;

public interface Z_GroupScheduleService {
    public Z_GroupSchedule insert(Z_GroupSchedule groupScheduleVO);
    public List<Z_GroupSchedule> findAll();
    public List<Z_GroupSchedule> findGroupScheduleListForGroup(int groupId);
    public void delete(int id);
    public Z_GroupSchedule findById(int id);
    public Z_GroupSchedule updateGroupSchedule(int id, Z_GroupSchedule groupScheduleVO);
    public List<Z_GroupScheduleView> findByTeacherId(int teacherId);
    public Z_GroupScheduleView findGroupScheduleViewById(int id);
    public List<Z_GroupScheduleStudentView> findByStudentId(int studentId);
}
