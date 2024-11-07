package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Room;

import java.util.List;

public interface Z_RoomService {
    Z_Room insert(Z_Room roomVO);

    public List<Z_Room> findAll();

    public void delete(int id);

    public Z_Room findById(int id);
    public Z_Room updateRoom(int id, Z_Room roomVO);
}
