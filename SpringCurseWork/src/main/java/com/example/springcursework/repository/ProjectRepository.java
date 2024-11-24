package com.example.springcursework.repository;

import com.example.springcursework.model.EmployeePosition;
import com.example.springcursework.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> {


}
