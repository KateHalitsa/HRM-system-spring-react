package com.example.springcursework.controller;

import com.example.springcursework.model.LookupItem;
import com.example.springcursework.payload.request.LookupFindRequest;
import com.example.springcursework.servise.LookupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "lookup")
@CrossOrigin(origins = "http://localhost:4200")
public class LookupController {
    @Autowired
    private LookupService lookupService;

    @GetMapping(value = "employee/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public LookupItem employeeItem(@PathVariable int id) {
        return this.lookupService.employeeItem(id);
    }

    @PostMapping(value = "/employee")
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<LookupItem> employeeList(@RequestBody LookupFindRequest findVO) {return this.lookupService.employeeList(findVO.getFindNamePart());
    }

    @GetMapping(value = "employee_position/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public LookupItem positionItem(@PathVariable int id) {
        return this.lookupService.positionItem(id);
    }

    @PostMapping(value = "/employee_position")
    @ResponseStatus(value = HttpStatus.CREATED)
    public List<LookupItem> positionList(@RequestBody LookupFindRequest findVO) {
        return this.lookupService.positionList(findVO.getFindNamePart());
    }

}
