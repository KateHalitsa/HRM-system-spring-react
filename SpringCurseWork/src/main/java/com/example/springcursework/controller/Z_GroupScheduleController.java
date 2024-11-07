package com.example.springcursework.controller;

import com.example.springcursework.model.Z_GroupSchedule;
import com.example.springcursework.model.Z_GroupScheduleStudentView;
import com.example.springcursework.model.Z_GroupScheduleView;
import com.example.springcursework.servise.Z_GroupScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "groupschedule")
@CrossOrigin(origins = "http://localhost:4200")
public class Z_GroupScheduleController {
    @Autowired
    private Z_GroupScheduleService groupScheduleService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Z_GroupSchedule registerGroupSchedule(@RequestBody Z_GroupSchedule groupScheduleVO) {
        return this.groupScheduleService.insert(groupScheduleVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_GroupSchedule> findAllGroupSchedule() {
        return this.groupScheduleService.findAll();
    }

    @GetMapping(value = "/find-for-group/{groupId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_GroupSchedule> findGroupScheduleListForGroup(@PathVariable int groupId) {

        return this.groupScheduleService.findGroupScheduleListForGroup(groupId);
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_GroupSchedule findById(@PathVariable int id) {
        return this.groupScheduleService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_GroupSchedule updateGroup(@PathVariable int id, @RequestBody Z_GroupSchedule groupScheduleVO) {
        return this.groupScheduleService.updateGroupSchedule(id, groupScheduleVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteGroupSchedule(@PathVariable int id) {
        this.groupScheduleService.delete(id);
    }

    @GetMapping(value = "/find-for-teacher/{teacherId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_GroupScheduleView> findGroupScheduleViewListByTeacherId(@PathVariable int teacherId) {

        return this.groupScheduleService.findByTeacherId(teacherId);
    }

    @GetMapping(value = "/find-for-student/{studentId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_GroupScheduleStudentView> findGroupScheduleStudentViewListByTeacherId(@PathVariable int studentId) {

        return this.groupScheduleService.findByStudentId(studentId);
    }

    @GetMapping(value = "/find-view-by-id/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_GroupScheduleView findGroupScheduleViewListById(@PathVariable int id) {
        return this.groupScheduleService.findGroupScheduleViewById(id);
    }

}
