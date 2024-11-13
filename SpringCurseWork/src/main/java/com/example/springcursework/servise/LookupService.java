package com.example.springcursework.servise;

import com.example.springcursework.model.LookupItem;

import java.util.List;

public interface LookupService {
    public List<LookupItem> employeeList(String namePart);
    public LookupItem employeeItem(int id);
    public List<LookupItem> positionList(String namePart);
    public LookupItem positionItem(int id);
}
