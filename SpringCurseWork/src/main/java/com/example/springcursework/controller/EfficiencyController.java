package com.example.springcursework.controller;

import com.example.springcursework.model.EmployeeEfficiencyCell;
import com.example.springcursework.model.EmployeeEfficiencyCell;
import com.example.springcursework.payload.request.LookupFindRequest;
import com.example.springcursework.payload.response.EmployeeEfficiencyTableResponse;
import com.example.springcursework.servise.EmployeeEfficiencyService;
import com.example.springcursework.servise.EmployeeService;
import com.example.springcursework.servise.WorkplaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "efficiency")
@CrossOrigin(origins = "http://localhost:4200")
public class EfficiencyController {
    @Autowired
    private EmployeeEfficiencyService employeeEfficiencyService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private WorkplaceService workplaceService;

    @PostMapping(value = "/load")
    @ResponseStatus(value = HttpStatus.OK)
    public EmployeeEfficiencyTableResponse load(/*@RequestBody LookupFindRequest findVO*/) {
        EmployeeEfficiencyTableResponse res = new EmployeeEfficiencyTableResponse(
                this.employeeEfficiencyService.loadEmployeeEfficiency(),
                this.employeeService.findAll(),
                this.workplaceService.findAll()
        );
        return res;
    }

}
