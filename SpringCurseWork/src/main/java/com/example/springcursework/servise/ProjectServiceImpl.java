package com.example.springcursework.servise;

import com.example.springcursework.model.Project;
import com.example.springcursework.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService
{
   @Autowired
   private ProjectRepository projectRepository;

    @Override
    public Project insert(Project projectVO) {
        return this.projectRepository.save(projectVO);
    }

    @Override
    public List<Project> findAll() {
        return this.projectRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.projectRepository.deleteById(id);
    }

    @Override
    public Project findById(int id) {
        return this.projectRepository.findById(id).get();
    }

    @Override
    public Project updateProject(int id, Project projectVO) {
        projectVO.setId(id);
        return this.projectRepository.save(projectVO);
    }
}
