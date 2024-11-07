package com.example.springcursework.servise;

import com.example.springcursework.model.Z_Room;
import com.example.springcursework.repository.Z_RoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class Z_RoomServiceImpl implements Z_RoomService
{
   @Autowired
   private Z_RoomRepository roomRepository;

    @Override

    public Z_Room insert(Z_Room roomVO) {
        return this.roomRepository.save(roomVO);
    }

    @Override
    public List<Z_Room> findAll() {
        return this.roomRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.roomRepository.deleteById(id);
    }

    @Override
    public Z_Room findById(int id) {
        return this.roomRepository.findById(id).get();
    }

    @Override
    public Z_Room updateRoom(int id, Z_Room roomVO) {
        roomVO.setId(id);
        return this.roomRepository.save(roomVO);
    }
}
