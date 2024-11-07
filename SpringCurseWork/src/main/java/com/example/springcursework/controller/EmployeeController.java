package com.example.springcursework.controller;

import com.example.springcursework.model.Employee;
import com.example.springcursework.servise.EmployeeService;
import com.example.springcursework.payload.request.EmployeeFindRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "employee")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Employee registerEmployee(@RequestBody Employee employeeVO) {
        return this.employeeService.insert(employeeVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Employee> findAllEmployee() {
        return this.employeeService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Employee findById(@PathVariable int id) {
        return this.employeeService.findById(id);
    }

    @PostMapping(value = "/find")
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<Employee> find(@RequestBody EmployeeFindRequest findVO) {
        return this.employeeService.findByNamePart(findVO.getFindNamePart());
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Employee updateEmployee(@PathVariable int id, @RequestBody Employee employeeVO) {
        return this.employeeService.updateEmployee(id, employeeVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable int id) {
        this.employeeService.delete(id);
    }

}
