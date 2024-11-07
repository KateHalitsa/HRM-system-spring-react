package com.example.springcursework.servise;


import com.example.springcursework.model.Z_Teacher;
import com.example.springcursework.repository.Z_TeacherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Z_TeacherServiceImpl implements Z_TeacherService {
    @Autowired
    private Z_TeacherRepository teacherRepository;

    @Override
    public Z_Teacher insert(Z_Teacher userVO) {
        return this.teacherRepository.save(userVO);
    }

    @Override
    public List<Z_Teacher> findAll() {
        return this.teacherRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.teacherRepository.deleteById(id);
    }

    @Override
    public Z_Teacher findById(int id) {
        return this.teacherRepository.findById(id).get();
    }
    @Override
    public Z_Teacher findByUserId(int userId){
        return this.teacherRepository.findByUserId(userId).orElseGet(() -> {return null;});
    }

    @Override
    public Z_Teacher updateTeacher(int id, Z_Teacher teacherVO) {
        teacherVO.setId(id);
        return this.teacherRepository.save(teacherVO);
    }
}
