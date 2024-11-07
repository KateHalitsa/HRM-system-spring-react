package com.example.springcursework.servise;

import com.example.springcursework.model.Z_StudentGroup;
import java.util.List;

public interface Z_StudentGroupService {
    public Z_StudentGroup insert(Z_StudentGroup groupScheduleVO);
    public List<Z_StudentGroup> findAll();
    public void delete(int id);
    public Z_StudentGroup findById(int id);
    public Z_StudentGroup updateStudentGroup(int id, Z_StudentGroup groupScheduleVO);
    public List<Z_StudentGroup> findStudentGroupListForStudent(int studentId);
}
