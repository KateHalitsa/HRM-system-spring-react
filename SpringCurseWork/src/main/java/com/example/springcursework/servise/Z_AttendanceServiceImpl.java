package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Attendance;
import com.example.springcursework.model.Z_AttendanceView;
import com.example.springcursework.repository.Z_AttendanceRepository;
import com.example.springcursework.repository.Z_AttendanceViewRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Z_AttendanceServiceImpl implements Z_AttendanceService {
    @Autowired
    private Z_AttendanceRepository attendanceRepository;

    @Autowired
    private Z_AttendanceViewRepository attendanceViewRepository;

    @Override
    public Z_Attendance insert(Z_Attendance attendanceVO) {
        return this.attendanceRepository.save(attendanceVO);
    }

    @Override
    public List<Z_Attendance> findAll() {
        return this.attendanceRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.attendanceRepository.deleteById(id);
    }

    @Override
    public Z_Attendance findById(int id) {
        return this.attendanceRepository.findById(id).get();
    }

    @Override
    public Z_Attendance updateAttendance(int id, Z_Attendance attendanceVO) {
        attendanceVO.setId(id);
        return this.attendanceRepository.save(attendanceVO);
    }

    @Override
    public List<Z_AttendanceView> findByGroupScheduleId(int groupScheduleId){
        List<Z_AttendanceView> result = attendanceViewRepository.findByGroupScheduleId(groupScheduleId);
        for (int i = 0; i < result.size(); i++) {
            Z_AttendanceView attend = result.get(i);
            if (attend.getAttendanceId() != null)
                attend.setIsChecked(attend.getAttendanceId() > 0);
            else
                attend.setIsChecked(false);
        }
        return result;
    }

    @Override
    public List<Z_AttendanceView> updateAttendances(int groupScheduleId, List<Z_AttendanceView> attendances){
        for (int i = 0; i < attendances.size(); i++) {
            Z_AttendanceView attend = attendances.get(i);
            boolean isEmptyAttendanceId = (attend.getAttendanceId() == null) || (attend.getAttendanceId() <= 0);
            if (attend.getIsChecked()){
                if (isEmptyAttendanceId){
                    Z_Attendance newAttendance = new Z_Attendance();
                    newAttendance.setGroupScheduleId(attend.getGroupScheduleId());
                    newAttendance.setStudentId(attend.getStudentId());
                    this.insert(newAttendance);
                }
            } else {
              if (!isEmptyAttendanceId){
                  this.delete(attend.getAttendanceId());
              }
            }
        }
        return findByGroupScheduleId(groupScheduleId);
    }
}
