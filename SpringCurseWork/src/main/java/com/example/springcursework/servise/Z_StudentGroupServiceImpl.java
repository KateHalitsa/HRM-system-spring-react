package com.example.springcursework.servise;

import com.example.springcursework.model.Z_StudentGroup;
import com.example.springcursework.repository.Z_StudentGroupRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Z_StudentGroupServiceImpl implements Z_StudentGroupService {
    @Autowired
    private Z_StudentGroupRepository studentGroupRepository;

    @Override
    public Z_StudentGroup insert(Z_StudentGroup studentGroupVO) {
        return this.studentGroupRepository.save(studentGroupVO);
    }

    @Override
    public List<Z_StudentGroup> findAll() {
        return this.studentGroupRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.studentGroupRepository.deleteById(id);
    }

    @Override
    public Z_StudentGroup findById(int id) {
        return this.studentGroupRepository.findById(id).get();
    }

    @Override
    public Z_StudentGroup updateStudentGroup(int id, Z_StudentGroup studentGroupVO) {
        studentGroupVO.setId(id);
        return this.studentGroupRepository.save(studentGroupVO);
    }
    @Override
    public List<Z_StudentGroup> findStudentGroupListForStudent(int studentId){
        return this.studentGroupRepository.findByStudentId(studentId);
    }
}
