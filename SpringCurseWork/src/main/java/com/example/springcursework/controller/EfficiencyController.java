package com.example.springcursework.controller;

import com.example.springcursework.model.EmployeeEfficiencyCalcResult;
import com.example.springcursework.model.EmployeeWorkplace;
import com.example.springcursework.payload.request.EmployeeEfficiencyForProjectRequest;
import com.example.springcursework.payload.request.EmployeeEfficiencyTableCalcRequest;
import com.example.springcursework.payload.response.EmployeeEfficiencyTableResponse;
import com.example.springcursework.servise.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
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

    @Autowired
    private EmployeeWorkplaceService employeeWorkplaceService;

    @PostMapping(value = "/load")
    @ResponseStatus(value = HttpStatus.OK)
    public EmployeeEfficiencyTableResponse load(@RequestBody EmployeeEfficiencyForProjectRequest findVO) {
        int projectId = findVO.getProjectId();
        LocalDateTime calcOnDate = findVO.getCalcOnDate();
        EmployeeEfficiencyTableResponse res = new EmployeeEfficiencyTableResponse(
                this.employeeEfficiencyService.loadEmployeeEfficiency(projectId, calcOnDate),
                this.employeeService.freeEmployeesOnDate(calcOnDate),
                this.workplaceService.projectVacanciesOnDate(projectId, calcOnDate)
        );
        return res;
    }
    @PostMapping(value = "/load_exist")
    @ResponseStatus(value = HttpStatus.OK)
    public EmployeeEfficiencyTableResponse loadExist(@RequestBody EmployeeEfficiencyForProjectRequest findVO) {
        int projectId = findVO.getProjectId();
        LocalDateTime calcOnDate = findVO.getCalcOnDate();
        return new EmployeeEfficiencyTableResponse(
                employeeEfficiencyService.loadExistEmployeeEfficiency(projectId, calcOnDate),
                employeeService.notFreeEmployeesOnDate(calcOnDate),
                workplaceService.projectVacanciesFilledOnDate(projectId, calcOnDate)
        );
    }
    @PostMapping(value = "/calc")
    @ResponseStatus(value = HttpStatus.OK)
    @ExceptionHandler(value = { Exception.class })
    public EmployeeEfficiencyCalcResult calc(@RequestBody EmployeeEfficiencyTableCalcRequest table) {

        try {
            HungarianAlgorithm hungarianAlgorithm = new HungarianAlgorithm();
            return hungarianAlgorithm.calculate(table);
        }catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PostMapping(value = "/apply")
    @ResponseStatus(value = HttpStatus.OK)
    public List<EmployeeWorkplace> apply(@RequestBody List<EmployeeWorkplace> contracts) {
        List<EmployeeWorkplace> res = this.employeeWorkplaceService.insertContacts(contracts);
        return res;
    }

}
