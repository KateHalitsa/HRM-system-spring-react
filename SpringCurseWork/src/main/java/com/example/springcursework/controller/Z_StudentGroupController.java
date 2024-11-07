package com.example.springcursework.controller;

import com.example.springcursework.model.Z_StudentGroup;
import com.example.springcursework.servise.Z_StudentGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "studentgroup")
@CrossOrigin(origins = "http://localhost:4200")
public class Z_StudentGroupController {
    @Autowired
    private Z_StudentGroupService studentGroupService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Z_StudentGroup registerStudentGroup(@RequestBody Z_StudentGroup studentGroupVO) {
        return this.studentGroupService.insert(studentGroupVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_StudentGroup> findAllStudentGroup() {
        return this.studentGroupService.findAll();
    }

    @GetMapping(value = "/find-for-student/{studentId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_StudentGroup> findStudentGroupListForStudent(@PathVariable int studentId) {

        return this.studentGroupService.findStudentGroupListForStudent(studentId);
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_StudentGroup findById(@PathVariable int id) {
        return this.studentGroupService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_StudentGroup updateGroup(@PathVariable int id, @RequestBody Z_StudentGroup studentGroupVO) {
        return this.studentGroupService.updateStudentGroup(id, studentGroupVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteStudentGroup(@PathVariable int id) {
        this.studentGroupService.delete(id);
    }

    /*
    @GetMapping(value = "/find-for-teacher/{teacherId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<StudentGroupView> findStudentGroupViewListByTeacherId(@PathVariable int teacherId) {

        return this.studentGroupService.findByTeacherId(teacherId);
    }*/


}
