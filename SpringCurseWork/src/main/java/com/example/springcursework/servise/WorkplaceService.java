package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeePosition;

import com.example.springcursework.model.Workplace;
import com.example.springcursework.model.Workplace;


import java.util.List;

public interface WorkplaceService {
    public Workplace insert(Workplace workplaceVO);

    public List<Workplace> findAll();

    public void delete(int id);

    public Workplace findById(int id);

    public Workplace updateWorkplace(int id, Workplace workplacerVO);

}
