package com.example.springcursework.controller;

import com.example.springcursework.model.EmployeeWorkplace;
import com.example.springcursework.model.EmployeeWorkplaceView;
import com.example.springcursework.servise.EmployeeWorkplaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "employee_workplace")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeWorkplaceController {
    @Autowired
    private EmployeeWorkplaceService employeeWorkplaceService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public EmployeeWorkplace registerEmployeeWorkplace(@RequestBody EmployeeWorkplace employeeVO) {
        return this.employeeWorkplaceService.insert(employeeVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<EmployeeWorkplace> findAllEmployeeWorkplace() {
        return this.employeeWorkplaceService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public EmployeeWorkplace findById(@PathVariable int id) {
        return this.employeeWorkplaceService.findById(id);
    }

    @GetMapping(value = "/view")
    @ResponseStatus(value = HttpStatus.OK)
    public List<EmployeeWorkplaceView> view(/*@RequestBody EmployeeWorkplaceFindRequest findVO*/) {
        return this.employeeWorkplaceService.view();
    }

    @GetMapping(value = "/history/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<EmployeeWorkplaceView> history(@PathVariable int id) {
        return this.employeeWorkplaceService.history(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public EmployeeWorkplace updateEmployeeWorkplace(@PathVariable int id, @RequestBody EmployeeWorkplace employeeVO) {
        return this.employeeWorkplaceService.updateEmployeeWorkplace(id, employeeVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteEmployeeWorkplace(@PathVariable int id) {
        this.employeeWorkplaceService.delete(id);
    }

}
