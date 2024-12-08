package com.example.springcursework.servise;

import com.example.springcursework.model.LookupItem;

import java.util.List;

public interface LookupService {
    List<LookupItem> employeeList(String namePart);
    LookupItem employeeItem(int id);

    List<LookupItem> positionList(String namePart);
    LookupItem positionItem(int id);

    List<LookupItem> projectList(String namePart);
    LookupItem projectItem(int id);

    List<LookupItem> workplaceList(String namePart);
    LookupItem workplaceItem(int id);
}
