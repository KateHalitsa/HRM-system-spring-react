package com.example.springcursework.controller;

import java.util.List;

import com.example.springcursework.model.Z_Student;
import com.example.springcursework.servise.Z_StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "student")
@CrossOrigin(origins = "http://localhost:4200")
public class Z_StudentController {
    @Autowired
    private Z_StudentService studentService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Z_Student registerStudent(@RequestBody Z_Student studentVO) {
        return this.studentService.insert(studentVO);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<Z_Student> findAllStudent() {
        return this.studentService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_Student findById(@PathVariable int id) {
        return this.studentService.findById(id);
    }

    @PutMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Z_Student updateStudent(@PathVariable int id, @RequestBody Z_Student studentVO) {
        return this.studentService.updateStudent(id, studentVO);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteStudent(@PathVariable int id) {
        this.studentService.delete(id);
    }
}
