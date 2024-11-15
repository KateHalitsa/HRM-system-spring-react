package com.example.springcursework.repository;

import com.example.springcursework.model.EmployeePositionFeature;
import com.example.springcursework.model.User;
import com.example.springcursework.model.UserRole;
import com.example.springcursework.model.WorkplaceFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface WorkplaceFeatureRepository extends JpaRepository<WorkplaceFeature, Integer> {
    @Query(value = "SELECT wf.* FROM  workplace_feature wf WHERE  wf.workplace_id=?1 AND wf.featureId = ?2", nativeQuery = true)
  WorkplaceFeature  findByWorkplaceAndFeatureId(int workplaceId, int featureId);
}
