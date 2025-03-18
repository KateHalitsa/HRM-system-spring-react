package com.example.springcursework.servise;

import com.example.springcursework.model.Project;
import com.example.springcursework.model.ProjectEfficiency;

import java.util.List;

public interface ProjectService {
    Project insert(Project projectVO);

    List<Project> findAll();

    void delete(int id);

    Project findById(int id);

    Project updateProject(int id, Project projectVO);
    List<ProjectEfficiency> getProjectEfficiency();
    ProjectEfficiency getProjectEfficiencyById(int projectId);
}
