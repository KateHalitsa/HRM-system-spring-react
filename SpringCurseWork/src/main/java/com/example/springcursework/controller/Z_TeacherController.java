package com.example.springcursework.controller;

import com.example.springcursework.model.Z_Teacher;
import com.example.springcursework.servise.Z_TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "teacher")
@CrossOrigin(origins = "http://localhost:4200")
public class Z_TeacherController {
    @Autowired
    private Z_TeacherService teacherService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Z_Teacher registerTeacher(@RequestBody Z_Teacher teacherVO) {
        return this.teacherService.insert(teacherVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_Teacher> findAllTeachers() {
        return this.teacherService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_Teacher findById(@PathVariable int id) {
        return this.teacherService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_Teacher updateTeacher(@PathVariable int id, @RequestBody Z_Teacher teacherVO) {
        return this.teacherService.updateTeacher(id, teacherVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteTeacher(@PathVariable int id) {
        this.teacherService.delete(id);
    }
}
