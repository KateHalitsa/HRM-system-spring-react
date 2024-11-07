package com.example.springcursework.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "group_schedule")
public class Z_GroupSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id; // Primary Key

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "group_id")
    private Integer groupId;

    @Column(name = "room_id")
    private Integer roomId;


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public Integer getGroupId() { return groupId; }
    public void setGroupId(Integer groupId) { this.groupId = groupId;}

    public Integer getRoomId() { return roomId; }
    public void setRoomId(Integer roomId) { this.roomId = roomId;}

   /* @Override
    public String toString() {
        return "Z_GroupSchedule [id=" + id + ", name=" + name +  "]";
    } */
}
