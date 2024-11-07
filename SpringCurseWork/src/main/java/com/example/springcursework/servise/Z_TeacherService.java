package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Teacher;

import java.util.List;

public interface Z_TeacherService {
    public Z_Teacher insert(Z_Teacher teacherVO);

    public List<Z_Teacher> findAll();

    public void delete(int id);

    public Z_Teacher findById(int id);

    public Z_Teacher findByUserId(int userId);

    public Z_Teacher updateTeacher(int id, Z_Teacher teacherVO);
}
