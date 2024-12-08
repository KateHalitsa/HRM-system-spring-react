package com.example.springcursework.repository;

import com.example.springcursework.model.FeatureForEmployee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeatureForEmployeeRepository extends JpaRepository<FeatureForEmployee, Integer> {
    @Query(value = """
            SELECT 
              f.id feature_id, 
              f.name feature_name, 
              ef.id employee_feature_id, 
              ef.value VALUE,
              (SELECT ep.name FROM employee_position ep WHERE ep.id = f.employee_position_id) employee_position_name
            FROM employee_position_feature f LEFT OUTER JOIN employee_feature ef ON (f.id = ef.feature_id AND ef.employee_id = ?1)
            ORDER BY employee_position_name, feature_name
            """,
            nativeQuery = true)
    List<FeatureForEmployee> findFeatureForEmployeeId(int employeeId);

}
