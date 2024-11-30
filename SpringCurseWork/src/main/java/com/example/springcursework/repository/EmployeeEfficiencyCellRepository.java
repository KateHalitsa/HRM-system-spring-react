package com.example.springcursework.repository;

import com.example.springcursework.model.EmployeeEfficiencyCell;
import com.example.springcursework.model.EmployeeEfficiencyCellKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface EmployeeEfficiencyCellRepository extends JpaRepository<EmployeeEfficiencyCell, EmployeeEfficiencyCellKey> {
    @Query(value = """
            SELECT wf.workplace_id, ef.employee_id, SUM(wf.weight * ef.value) efficiency
            FROM workplace_feature wf, employee_feature ef, workplace w
            WHERE wf.feature_id = ef.feature_id and w.id = wf.workplace_id and w.project_id = ?1
                  and not exists (select * from employee_workplace ew where ew.workplace_id = wf.workplace_id and ?2 BETWEEN ew.from_date and ew.to_date)
                  and not exists (select * from employee_workplace ew where ew.employee_id = ef.employee_id and ?2 BETWEEN ew.from_date and ew.to_date)
            GROUP BY wf.workplace_id, ef.employee_id
            """,
            nativeQuery = true)
    List<EmployeeEfficiencyCell> loadEmployeeEfficiency(int projectId, LocalDateTime calcOnDate);

}
