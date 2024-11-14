package com.example.springcursework.servise;

import com.example.springcursework.model.*;

import com.example.springcursework.model.Workplace;


import java.util.List;

public interface WorkplaceService {
    public Workplace insert(Workplace workplaceVO);

    public List<Workplace> findAll();

    public void delete(int id);

    public Workplace findById(int id);

    public Workplace updateWorkplace(int id, Workplace workplacerVO);

    public List<EmployeePositionFeature> findRelatedFeatures(int userId);

    public List<FeatureForWorkplace> FeaturesByWorkplaceId(int id);
    public List<FeatureForWorkplace> updateFeaturesByWorkplaceId(int workplaceId, List<FeatureForWorkplace> features);

}
