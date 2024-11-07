package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Group;
import com.example.springcursework.model.Z_GroupGeneralView;
import com.example.springcursework.repository.Z_GroupGeneralViewRepository;
import com.example.springcursework.repository.Z_GroupRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Z_GroupServiceImpl implements Z_GroupService {
    @Autowired
    private Z_GroupRepository groupRepository;

    @Autowired
    private Z_GroupGeneralViewRepository groupGeneralViewRepository;

    @Override
    public Z_Group insert(Z_Group groupVO) {
        return this.groupRepository.save(groupVO);
    }

    @Override
    public List<Z_Group> findAll() {
        return this.groupRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.groupRepository.deleteById(id);
    }

    @Override
    public Z_Group findById(int id) {
        return this.groupRepository.findById(id).get();
    }

    @Override
    public Z_Group updateGroup(int id, Z_Group groupVO) {
        groupVO.setId(id);
        return this.groupRepository.save(groupVO);
    }
    @Override
    public List<Z_GroupGeneralView> generalView() {
        return this.groupGeneralViewRepository.findAll();
    }

}
