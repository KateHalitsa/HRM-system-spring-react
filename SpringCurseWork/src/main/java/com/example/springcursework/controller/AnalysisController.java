package com.example.springcursework.controller;

import com.example.springcursework.model.ProjectEfficiency;
import com.example.springcursework.model.WorkplaceStatistic;
import com.example.springcursework.servise.EmployeePositionService;
import com.example.springcursework.servise.ProjectService;
import com.example.springcursework.servise.ProjectServiceImpl;
import com.example.springcursework.servise.WorkplaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "analysis")
@CrossOrigin(origins = "http://localhost:4200")
public class AnalysisController {

    @Autowired
    private EmployeePositionService employeePositionService;
    @Autowired
    private ProjectService projectService;

    @GetMapping("")
    @ResponseStatus(value = HttpStatus.OK)
    public List<WorkplaceStatistic> getWorkplaceStatistics() {
        return employeePositionService.getWorkplaceStatistics();
    }
    @GetMapping("/efficiency")
    @ResponseStatus(value = HttpStatus.OK)
    public List<WorkplaceStatistic> getEfficiencyStatistics() {
        return employeePositionService.getWorkplaceStatistics();
    }


    @GetMapping("/project_efficiency")
    @ResponseStatus(value = HttpStatus.OK)
    public List<ProjectEfficiency> getProjectEfficiency() {
        return projectService.getProjectEfficiency();
    }
    @GetMapping("/project_efficiency/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public ProjectEfficiency getProjectEfficiencyById(@PathVariable int id) {
        return projectService.getProjectEfficiencyById(id);
    }
}
