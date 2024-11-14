package com.example.springcursework.repository;

import com.example.springcursework.model.EmployeePositionFeature;
import com.example.springcursework.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeePositionFeatureRepository extends JpaRepository<EmployeePositionFeature, Integer> {
    @Query(value = "select f.* from employee_position_feature f, workplace_feature wf where f.id = wf.feature_id and wf.workplace_id = ?1", nativeQuery = true)
    List<EmployeePositionFeature> findByWorkplaceId(int workplaceId);
}
