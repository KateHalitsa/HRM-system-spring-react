package com.example.springcursework.controller;

import com.example.springcursework.model.Project;
//import com.example.springcursework.payload.request.ProjectFindRequest;
import com.example.springcursework.servise.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "project")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {
    @Autowired
    private ProjectService employeePositionService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Project registerProject(@RequestBody Project employeeVO) {
        return this.employeePositionService.insert(employeeVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Project> findAllProject() {
        return this.employeePositionService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Project findById(@PathVariable int id) {
        return this.employeePositionService.findById(id);
    }

    /*@PostMapping(value = "/find")
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<Project> find(@RequestBody ProjectFindRequest findVO) {
        return this.employeePositionService.findByNamePart(findVO.getFindNamePart());
    }*/

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Project updateProject(@PathVariable int id, @RequestBody Project employeeVO) {
        return this.employeePositionService.updateProject(id, employeeVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable int id) {
        this.employeePositionService.delete(id);
    }

}
