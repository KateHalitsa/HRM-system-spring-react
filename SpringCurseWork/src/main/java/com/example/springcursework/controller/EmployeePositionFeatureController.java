package com.example.springcursework.controller;

import com.example.springcursework.model.EmployeePositionFeature;
import com.example.springcursework.servise.EmployeePositionFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "employee_position_feature")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeePositionFeatureController {
    @Autowired
    private EmployeePositionFeatureService featureService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public EmployeePositionFeature registerEmployeePositionFeature(@RequestBody EmployeePositionFeature workplaceVO) {
        return this.featureService.insert(workplaceVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<EmployeePositionFeature> findAllEmployeePositionFeatures() {
        return this.featureService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public EmployeePositionFeature findById(@PathVariable int id) {
        return this.featureService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public EmployeePositionFeature updateEmployeePositionFeature(@PathVariable int id, @RequestBody EmployeePositionFeature workplaceVO) {
        return this.featureService.updateEmployeePositionFeature(id, workplaceVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteEmployeePositionFeature(@PathVariable int id) {
        this.featureService.delete(id);
    }


}
