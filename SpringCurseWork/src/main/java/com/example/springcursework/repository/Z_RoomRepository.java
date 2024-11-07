package com.example.springcursework.repository;

import com.example.springcursework.model.Z_Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Z_RoomRepository extends JpaRepository<Z_Room, Integer> {
   // Optional<Z_Room> findRoomById(int roomId);
}
