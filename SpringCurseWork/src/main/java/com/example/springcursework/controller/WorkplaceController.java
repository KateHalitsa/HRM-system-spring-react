package com.example.springcursework.controller;


import com.example.springcursework.model.FeatureForWorkplace;
import com.example.springcursework.model.RoleForUser;
import com.example.springcursework.model.Workplace;
import com.example.springcursework.servise.WorkplaceService;
import com.example.springcursework.servise.Z_StudentService;
import com.example.springcursework.servise.Z_TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "workplace")
@CrossOrigin(origins = "http://localhost:4200")
public class WorkplaceController {
    @Autowired
    private WorkplaceService workplaceService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Workplace registerWorkplace(@RequestBody Workplace workplaceVO) {
        return this.workplaceService.insert(workplaceVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Workplace> findAllWorkplaces() {
        return this.workplaceService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Workplace findById(@PathVariable int id) {
        return this.workplaceService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Workplace updateWorkplace(@PathVariable int id, @RequestBody Workplace workplaceVO) {
        return this.workplaceService.updateWorkplace(id, workplaceVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteWorkplace(@PathVariable int id) {
        this.workplaceService.delete(id);
    }

    @GetMapping(value = "/features/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<FeatureForWorkplace> FeaturesByWorkplaceId(@PathVariable int id) {
        return workplaceService.FeaturesByWorkplaceId(id);
    }

    @PutMapping(value = "/features/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<FeatureForWorkplace> FeaturesByWorkplaceId(@PathVariable int id, @RequestBody List<FeatureForWorkplace> featuresVO) {
        return workplaceService.updateFeaturesByWorkplaceId(id, featuresVO);
    }

   /* @GetMapping(value = "/features/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<FeatureForWorkplace> ProjectsByWorkplaceId(@PathVariable int id) {
        return workplaceService.ProjectsByWorkplaceId(id);
    }

    @PutMapping(value = "/features/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<FeatureForWorkplace> ProjectsByWorkplaceId(@PathVariable int id, @RequestBody List<FeatureForWorkplace> featuresVO) {
        return workplaceService.updateProjectByWorkplaceId(id, featuresVO);
    }*/
}
