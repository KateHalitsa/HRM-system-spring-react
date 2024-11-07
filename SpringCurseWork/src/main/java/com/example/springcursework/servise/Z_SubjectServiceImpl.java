package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Subject;

import com.example.springcursework.repository.Z_SubjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Z_SubjectServiceImpl implements Z_SubjectService {
    @Autowired
    private Z_SubjectRepository subjectRepository;


    @Override
    public Z_Subject insert(Z_Subject subjectVO) {
        return this.subjectRepository.save(subjectVO);
    }

    @Override
    public List<Z_Subject> findAll() {
        return this.subjectRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.subjectRepository.deleteById(id);
    }

    @Override
    public Z_Subject findById(int id) {
        return this.subjectRepository.findById(id).get();
    }

    @Override
    public Z_Subject updateSubject(int id, Z_Subject subjectVO) {
        subjectVO.setId(id);
        return this.subjectRepository.save(subjectVO);
    }


}
