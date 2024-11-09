package com.example.springcursework.controller;

import com.example.springcursework.model.EmployeePosition;
import com.example.springcursework.payload.request.EmployeePositionFindRequest;
import com.example.springcursework.servise.EmployeePositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "employee_position")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeePositionController {
    @Autowired
    private EmployeePositionService employeePositionService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public EmployeePosition registerEmployeePosition(@RequestBody EmployeePosition employeeVO) {
        return this.employeePositionService.insert(employeeVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<EmployeePosition> findAllEmployeePosition() {
        return this.employeePositionService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public EmployeePosition findById(@PathVariable int id) {
        return this.employeePositionService.findById(id);
    }

    @PostMapping(value = "/find")
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<EmployeePosition> find(@RequestBody EmployeePositionFindRequest findVO) {
        return this.employeePositionService.findByNamePart(findVO.getFindNamePart());
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public EmployeePosition updateEmployeePosition(@PathVariable int id, @RequestBody EmployeePosition employeeVO) {
        return this.employeePositionService.updateEmployeePosition(id, employeeVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteEmployeePosition(@PathVariable int id) {
        this.employeePositionService.delete(id);
    }

}
