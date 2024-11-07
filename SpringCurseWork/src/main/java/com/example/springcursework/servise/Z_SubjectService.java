package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Subject;


import java.util.List;

public interface Z_SubjectService {
    public Z_Subject insert(Z_Subject subjectVO);

    public List<Z_Subject> findAll();

    public void delete(int id);

    public Z_Subject findById(int id);

    public Z_Subject updateSubject(int id, Z_Subject subjectVO);

}
