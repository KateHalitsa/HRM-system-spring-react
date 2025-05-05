package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeeEfficiencyCell;

import java.time.LocalDateTime;
import java.util.List;

public interface EmployeeEfficiencyService {
    List<EmployeeEfficiencyCell> loadEmployeeEfficiency(int projectId, LocalDateTime calcOnDate);
    List<EmployeeEfficiencyCell> loadExistEmployeeEfficiency(int projectId, LocalDateTime calcOnDate);
}
