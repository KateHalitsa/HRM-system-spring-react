package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Group;
import com.example.springcursework.model.Z_GroupGeneralView;

import java.util.List;

public interface Z_GroupService {
    public Z_Group insert(Z_Group groupVO);

    public List<Z_Group> findAll();

    public void delete(int id);

    public Z_Group findById(int id);

    public Z_Group updateGroup(int id, Z_Group groupVO);

    public List<Z_GroupGeneralView> generalView();
}
