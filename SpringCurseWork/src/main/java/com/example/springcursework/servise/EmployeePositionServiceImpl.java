package com.example.springcursework.servise;

import com.example.springcursework.model.EmployeePosition;
import com.example.springcursework.model.ProjectEfficiency;
import com.example.springcursework.model.WorkplaceStatistic;
import com.example.springcursework.repository.EmployeePositionRepository;
import com.example.springcursework.repository.WorkplaceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class EmployeePositionServiceImpl implements EmployeePositionService
{
   @Autowired
   private EmployeePositionRepository employeePositionRepository;
    @Autowired
    private WorkplaceRepository workplaceRepository;
    @Override

    public EmployeePosition insert(EmployeePosition employeeVO) {
        return this.employeePositionRepository.save(employeeVO);
    }

    @Override
    public List<EmployeePosition> findAll() {
        return this.employeePositionRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.employeePositionRepository.deleteById(id);
    }

    @Override
    public EmployeePosition findById(int id) {
        return this.employeePositionRepository.findById(id).get();
    }

    @Override
    public EmployeePosition updateEmployeePosition(int id, EmployeePosition employeeVO) {
        employeeVO.setId(id);
        return this.employeePositionRepository.save(employeeVO);
    }
    public List<WorkplaceStatistic> getWorkplaceStatistics() {
        List<WorkplaceStatistic> statistics = new ArrayList<>();

        List<EmployeePosition> positions = employeePositionRepository.findAll();

        for (EmployeePosition position : positions) {
            int count = workplaceRepository.countByEmployeePositionId(position.getId());
            statistics.add(new WorkplaceStatistic(position.getName(), count));
        }

        return statistics;}


}
