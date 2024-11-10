package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeePositionFeature;
import com.example.springcursework.model.Workplace;

import java.util.List;

public interface EmployeePositionFeatureService {
    public EmployeePositionFeature insert(EmployeePositionFeature featureVO);

    public List<EmployeePositionFeature> findAll();

    public void delete(int id);

    public EmployeePositionFeature findById(int id);

    public EmployeePositionFeature updateEmployeePositionFeature(int id, EmployeePositionFeature featureVO);

}
