package com.example.springcursework.repository;

import com.example.springcursework.model.EmployeeFeature;
import com.example.springcursework.model.EmployeePositionFeature;
import com.example.springcursework.model.ProjectProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectProgressRepository extends JpaRepository<ProjectProgress, Integer> {
    @Query(value = "select pp.* from project p, project_progress pp where p.id = pp.project_id and pp.project_id = ?1", nativeQuery = true)
    List<ProjectProgress> findByProjectId(int projectId);
    @Modifying
    @Query(value = "delete from project_progress pp WHERE pp.project_id = ?1", nativeQuery = true)
    void deleteByProjectId(@Param("project_id") int projectId);
}
