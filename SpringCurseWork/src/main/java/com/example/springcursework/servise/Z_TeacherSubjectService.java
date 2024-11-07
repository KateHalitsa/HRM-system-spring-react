package com.example.springcursework.servise;

import com.example.springcursework.model.Z_TeacherSubject;

import java.util.List;

public interface Z_TeacherSubjectService {
    public Z_TeacherSubject insert(Z_TeacherSubject teacherSubjectVO);
    public List<Z_TeacherSubject> findAll();
    public void delete(int id);
    public Z_TeacherSubject findById(int id);
    public Z_TeacherSubject updateTeacherSubject(int id, Z_TeacherSubject teacherSubjectVO);
    public List<Z_TeacherSubject> findTeacherSubjectListForTeacher(int teacherId);
}
