package com.example.springcursework.controller;

import com.example.springcursework.model.EmployeeWorkplace;
/*import com.example.springcursework.payload.request.EmployeeWorkplaceFindRequest;*/
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

    /*@PostMapping(value = "/find")
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<EmployeeWorkplace> find(@RequestBody EmployeeWorkplaceFindRequest findVO) {
        return this.employeeWorkplaceService.findByNamePart(findVO.getFindNamePart());
    }*/

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
