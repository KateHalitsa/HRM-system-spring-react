package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeePositionFeature;

import java.util.List;

public interface EmployeePositionFeatureService {
    EmployeePositionFeature insert(EmployeePositionFeature featureVO);

    List<EmployeePositionFeature> findAll();

    void delete(int id);

    EmployeePositionFeature findById(int id);

    EmployeePositionFeature updateEmployeePositionFeature(int id, EmployeePositionFeature featureVO);

}
