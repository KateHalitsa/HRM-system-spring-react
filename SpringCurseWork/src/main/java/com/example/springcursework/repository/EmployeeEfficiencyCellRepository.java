package com.example.springcursework.repository;

import com.example.springcursework.model.EmployeeEfficiencyCell;
import com.example.springcursework.model.EmployeeEfficiencyCellKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeEfficiencyCellRepository extends JpaRepository<EmployeeEfficiencyCell, EmployeeEfficiencyCellKey> {
    @Query(value = """
            SELECT wf.workplace_id, ef.employee_id, SUM(wf.weight * ef.value) efficiency
            FROM workplace_feature wf, empoyee_feature ef
            WHERE wf.feature_id = ef.feature_id
            GROUP BY wf.workplace_id, ef.employee_id
            """,
            nativeQuery = true)
    List<EmployeeEfficiencyCell> loadEmployeeEfficiency();

}
