package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Student;

import java.util.List;

public interface Z_StudentService {
    public Z_Student insert(Z_Student studentVO);

    public List<Z_Student> findAll();

    public void delete(int id);

    public Z_Student findById(int id);

    public Z_Student findByUserId(int userId);

    public Z_Student updateStudent(int id, Z_Student studentVO);
}
