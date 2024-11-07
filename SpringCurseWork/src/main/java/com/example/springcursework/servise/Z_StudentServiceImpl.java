package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Student;
import com.example.springcursework.repository.Z_StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Z_StudentServiceImpl implements Z_StudentService {
    @Autowired
    private Z_StudentRepository studentRepository;

    @Override
    public Z_Student insert(Z_Student studentVO) {
        return this.studentRepository.save(studentVO);
    }

    @Override
    public List<Z_Student> findAll() {

        return this.studentRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.studentRepository.deleteById(id);
    }

    @Override
    public Z_Student findById(int id) {
        return this.studentRepository.findById(id).get();
    }

    @Override
    public Z_Student findByUserId(int userId){
        return this.studentRepository.findByUserId(userId).orElseGet(() -> {return null;});
    }

    @Override
    public Z_Student updateStudent(int id, Z_Student studentVO) {
        studentVO.setId(id);
        return this.studentRepository.save(studentVO);
    }
}
