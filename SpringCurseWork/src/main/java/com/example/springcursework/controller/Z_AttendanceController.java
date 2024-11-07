package com.example.springcursework.controller;

import com.example.springcursework.model.Z_Attendance;
import com.example.springcursework.model.Z_AttendanceView;
import com.example.springcursework.servise.Z_AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "attendance")
@CrossOrigin(origins = "http://localhost:4200")
public class Z_AttendanceController {
    @Autowired
    private Z_AttendanceService attendanceService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Z_Attendance registerAttendance(@RequestBody Z_Attendance attendanceVO) {
        return this.attendanceService.insert(attendanceVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_Attendance> findAllAttendance() {
        return this.attendanceService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_Attendance findById(@PathVariable int id) {
        return this.attendanceService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_Attendance updateGroup(@PathVariable int id, @RequestBody Z_Attendance attendanceVO) {
        return this.attendanceService.updateAttendance(id, attendanceVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteAttendance(@PathVariable int id) {
        this.attendanceService.delete(id);
    }

    @GetMapping(value = "/find-for-group-schedule/{groupScheduleId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_AttendanceView> findByGroupScheduleId(@PathVariable int groupScheduleId) {
       return this.attendanceService.findByGroupScheduleId(groupScheduleId);
    }

    @PutMapping(value = "/update-attendances/{groupScheduleId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_AttendanceView> updateAttendances(@PathVariable int groupScheduleId, @RequestBody List<Z_AttendanceView> attendances) {
        return this.attendanceService.updateAttendances ( groupScheduleId, attendances);
    }

}
