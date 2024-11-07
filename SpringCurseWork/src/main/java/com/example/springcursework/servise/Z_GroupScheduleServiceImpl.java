package com.example.springcursework.servise;

import com.example.springcursework.model.Z_GroupSchedule;
import com.example.springcursework.model.Z_GroupScheduleStudentView;
import com.example.springcursework.model.Z_GroupScheduleView;
import com.example.springcursework.repository.Z_GroupScheduleRepository;
import com.example.springcursework.repository.Z_GroupScheduleViewRepository;
import com.example.springcursework.repository.Z_GroupScheduleStudentViewRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Z_GroupScheduleServiceImpl implements Z_GroupScheduleService {
    @Autowired
    private Z_GroupScheduleRepository groupScheduleRepository;

    @Autowired
    private Z_GroupScheduleViewRepository groupScheduleViewRepository;

    @Autowired
    private Z_GroupScheduleStudentViewRepository groupScheduleStudentViewRepository;

    @Override
    public Z_GroupSchedule insert(Z_GroupSchedule groupScheduleVO) {
        return this.groupScheduleRepository.save(groupScheduleVO);
    }

    @Override
    public List<Z_GroupSchedule> findAll() {
        return this.groupScheduleRepository.findAll();
    }

    @Override
    public List<Z_GroupSchedule> findGroupScheduleListForGroup(int groupId){
        return this.groupScheduleRepository.findByGroupId(groupId);
    }

    @Override
    public void delete(int id) {
        this.groupScheduleRepository.deleteById(id);
    }

    @Override
    public Z_GroupSchedule findById(int id) {
        return this.groupScheduleRepository.findById(id).get();
    }

    @Override
    public Z_GroupSchedule updateGroupSchedule(int id, Z_GroupSchedule groupScheduleVO) {
        groupScheduleVO.setId(id);
        return this.groupScheduleRepository.save(groupScheduleVO);
    }
    @Override
    public List<Z_GroupScheduleView> findByTeacherId(int teacherId){
        return this.groupScheduleViewRepository.findByTeacherId(teacherId);
    }
    @Override
    public Z_GroupScheduleView findGroupScheduleViewById(int id) {
        return this.groupScheduleViewRepository.findById(id).get();
    }

    @Override
    public List<Z_GroupScheduleStudentView> findByStudentId(int studentId){
        return this.groupScheduleStudentViewRepository.findByStudentId(studentId);
    }
}
