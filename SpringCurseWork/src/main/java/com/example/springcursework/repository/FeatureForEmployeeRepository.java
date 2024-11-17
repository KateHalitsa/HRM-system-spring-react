package com.example.springcursework.repository;

import com.example.springcursework.model.FeatureForEmployee;
import com.example.springcursework.model.FeatureForWorkplace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeatureForEmployeeRepository extends JpaRepository<FeatureForEmployee, Integer> {
    @Query(value = """
            select f.id feature_id, f.name feature_name, not ISNULL(ef.employee_id) is_selected, ef.id employee_feature_id, ef.value value
            from employee_position_feature f LEFT OUTER join employee_feature ef on (f.id = ef.feature_id and ef.employee_id = ?1)
            """,
            nativeQuery = true)
    List<FeatureForEmployee> findFeatureForEmployeeId(int employeeId);

}
