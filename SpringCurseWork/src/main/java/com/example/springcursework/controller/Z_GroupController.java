package com.example.springcursework.controller;

import com.example.springcursework.model.Z_Group;
import com.example.springcursework.model.Z_GroupGeneralView;
import com.example.springcursework.servise.Z_GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "group")
@CrossOrigin(origins = "http://localhost:4200")
public class Z_GroupController {
    @Autowired
    private Z_GroupService groupService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Z_Group registerGroup(@RequestBody Z_Group groupVO) {
        return this.groupService.insert(groupVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_Group> findAllGroup() {
        return this.groupService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_Group findById(@PathVariable int id) {
        return this.groupService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_Group updateGroup(@PathVariable int id, @RequestBody Z_Group groupVO) {
        return this.groupService.updateGroup(id, groupVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteGroup(@PathVariable int id) {
        this.groupService.delete(id);
    }

    @GetMapping(value = "/general-view")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_GroupGeneralView> generalView() {
        return this.groupService.generalView();
    }

}
