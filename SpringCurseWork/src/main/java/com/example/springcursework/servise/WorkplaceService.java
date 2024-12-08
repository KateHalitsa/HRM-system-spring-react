package com.example.springcursework.servise;

import com.example.springcursework.model.*;

import com.example.springcursework.model.Workplace;


import java.time.LocalDateTime;
import java.util.List;

public interface WorkplaceService {
    Workplace insert(Workplace workplaceVO);

    List<Workplace> findAll();

    void delete(int id);

    Workplace findById(int id);

    Workplace updateWorkplace(int id, Workplace workplaceVO);

    List<FeatureForWorkplace> FeaturesByWorkplaceId(int id);
    List<FeatureForWorkplace> updateFeaturesByWorkplaceId(int workplaceId, List<FeatureForWorkplace> features);

    List<Workplace> projectVacanciesOnDate(int projectId, LocalDateTime calcOnDate);

}
