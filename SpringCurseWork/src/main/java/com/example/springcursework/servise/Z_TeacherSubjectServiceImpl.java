package com.example.springcursework.servise;

import com.example.springcursework.model.Z_TeacherSubject;
import com.example.springcursework.repository.Z_TeacherSubjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Z_TeacherSubjectServiceImpl implements Z_TeacherSubjectService {
    @Autowired
    private Z_TeacherSubjectRepository teacherSubjectRepository;

    @Override
    public Z_TeacherSubject insert(Z_TeacherSubject teacherSubjectVO) {
        return this.teacherSubjectRepository.save(teacherSubjectVO);
    }

    @Override
    public List<Z_TeacherSubject> findAll() {
        return this.teacherSubjectRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.teacherSubjectRepository.deleteById(id);
    }

    @Override
    public Z_TeacherSubject findById(int id) {
        return this.teacherSubjectRepository.findById(id).get();
    }

    @Override
    public Z_TeacherSubject updateTeacherSubject(int id, Z_TeacherSubject teacherSubjectVO) {
        teacherSubjectVO.setId(id);
        return this.teacherSubjectRepository.save(teacherSubjectVO);
    }
    @Override
    public List<Z_TeacherSubject> findTeacherSubjectListForTeacher(int teacherId){
        return this.teacherSubjectRepository.findByTeacherId(teacherId);
    }
}
