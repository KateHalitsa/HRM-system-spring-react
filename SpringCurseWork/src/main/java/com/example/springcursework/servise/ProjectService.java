package com.example.springcursework.servise;

import com.example.springcursework.model.Project;

import java.util.List;

public interface ProjectService {
    Project insert(Project projectVO);

    public List<Project> findAll();

    public void delete(int id);

    public Project findById(int id);

    public List<Project> findByNamePart(String namePart);

    public Project updateProject(int id, Project projectVO);
}
