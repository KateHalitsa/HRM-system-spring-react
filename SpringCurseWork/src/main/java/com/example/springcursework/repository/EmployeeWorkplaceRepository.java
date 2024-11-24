package com.example.springcursework.repository;

import com.example.springcursework.model.EmployeeFeature;
import com.example.springcursework.model.EmployeeWorkplace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeWorkplaceRepository extends JpaRepository<EmployeeWorkplace, Integer> {
    /*
    @Query(value = "SELECT wf.* FROM  workplace_feature wf WHERE  wf.workplace_id=?1 AND wf.featureId = ?2", nativeQuery = true)
  WorkplaceFeature  findByWorkplaceAndFeatureId(int workplaceId, int featureId);
     */
}
