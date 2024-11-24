package com.example.springcursework.servise;

import com.example.springcursework.model.Project;
import com.example.springcursework.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


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

    private boolean findByKeys(String str, String[] keys){
        String s = str.toLowerCase();
        for (String key: keys){
            if (s.indexOf(key) >= 0)
                return true;
        }
        return false;
    }

    @Override
    public List<Project> findByNamePart(String namePart)
    {
        List<Project> filteredList;
        List<Project> originalList = this.projectRepository.findAll();

        String[] keys = namePart.trim().toLowerCase().split(" ");
        if (keys.length == 0) {
            filteredList = originalList;
        } else {
            filteredList = originalList.stream()
                    .filter(project ->
                            findByKeys(project.getName(), keys)
                    ).collect(Collectors.toList());
        }

        filteredList.sort(Comparator.comparing(Project::getName));

        return filteredList;
    }

    @Override
    public Project updateProject(int id, Project projectVO) {
        projectVO.setId(id);
        return this.projectRepository.save(projectVO);
    }
}
