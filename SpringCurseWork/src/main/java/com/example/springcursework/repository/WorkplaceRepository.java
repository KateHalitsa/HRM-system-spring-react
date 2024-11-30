package com.example.springcursework.repository;

import com.example.springcursework.model.Workplace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

public interface WorkplaceRepository extends JpaRepository<Workplace, Integer> {
    Optional<Workplace> findByName(String workplacename);

    @Query(value = "SELECT w.* FROM  workplace w WHERE  w.project_id=?1 " +
            "and NOT EXISTS (SELECT * FROM employee_workplace ew WHERE ew.workplace_id = w.id AND ?2 BETWEEN ew.from_date AND ew.to_date)", nativeQuery = true)
    List<Workplace> projectVacanciesOnDate(int projectId, LocalDateTime calcOnDate);

}
