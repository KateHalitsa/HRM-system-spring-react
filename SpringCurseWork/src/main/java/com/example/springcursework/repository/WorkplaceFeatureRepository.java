package com.example.springcursework.repository;

import com.example.springcursework.model.UserRole;
import com.example.springcursework.model.WorkplaceFeature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkplaceFeatureRepository extends JpaRepository<WorkplaceFeature, Integer> {

}
