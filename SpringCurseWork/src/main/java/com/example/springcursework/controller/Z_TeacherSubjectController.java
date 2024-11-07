package com.example.springcursework.controller;

import com.example.springcursework.model.Z_TeacherSubject;
import com.example.springcursework.servise.Z_TeacherSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "teachersubject")
@CrossOrigin(origins = "http://localhost:4200")
public class Z_TeacherSubjectController {
    @Autowired
    private Z_TeacherSubjectService teacherSubjectService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Z_TeacherSubject registerTeacherSubject(@RequestBody Z_TeacherSubject teacherSubjectVO) {
        return this.teacherSubjectService.insert(teacherSubjectVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_TeacherSubject> findAllTeacherSubject() {
        return this.teacherSubjectService.findAll();
    }

    @GetMapping(value = "/find-for-teacher/{teacherId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_TeacherSubject> findTeacherSubjectListForTeacher(@PathVariable int teacherId) {

        return this.teacherSubjectService.findTeacherSubjectListForTeacher(teacherId);
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_TeacherSubject findById(@PathVariable int id) {
        return this.teacherSubjectService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_TeacherSubject updateGroup(@PathVariable int id, @RequestBody Z_TeacherSubject teacherSubjectVO) {
        return this.teacherSubjectService.updateTeacherSubject(id, teacherSubjectVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteTeacherSubject(@PathVariable int id) {
        this.teacherSubjectService.delete(id);
    }

    /*
    @GetMapping(value = "/find-for-teacher/{teacherId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_TeacherSubject> findTeacherSubjectViewListByTeacherId(@PathVariable int teacherId) {

        return this.teacherSubjectService.findTeacherSubjectListForTeacher(teacherId);
    }*/


}
