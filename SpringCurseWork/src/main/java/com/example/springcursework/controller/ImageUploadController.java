package com.example.springcursework.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/image")
public class ImageUploadController {

    @Value("${upload.dir}")
    private String uploadDir; // Путь для сохранения загруженных изображений

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select an image to upload.");
        }

        try {
            // Создаем папку, если она не существует
            Files.createDirectories(Paths.get(uploadDir));

            // Получаем оригинальное имя файла
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);

            // Сохраняем файл на сервере
            Files.write(path, file.getBytes());

            return ResponseEntity.ok("Image uploaded successfully: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }

    @PostMapping("/employee/{id}/image/upload")
    public ResponseEntity<String> uploadImage(@PathVariable("id") Long employeeId, @RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select an image to upload.");
        }

        try {
            // Создаем директорию для сотрудников, если она не существует
            Path employeeDir = Paths.get(uploadDir + "employees/" + employeeId);
            Files.createDirectories(employeeDir);

            // Переименовываем файл в соответствии с id сотрудника
            String fileName = employeeId + ".jpg"; // Можно использовать другой формат, если необходимо
            Path path = employeeDir.resolve(fileName);

            // Сохраняем файл на сервере
            Files.write(path, file.getBytes());

            return ResponseEntity.ok("Image uploaded successfully: " + path.toString());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }
    @GetMapping("/employee/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long employeeId) {
        try {
            // Путь к изображению
            Path path = Paths.get(uploadDir + "employees/" + employeeId + "/" + employeeId + ".jpg");

            // Проверка существования файла
            if (Files.exists(path)) {
                // Читаем файл в байтовый массив
                byte[] imageBytes = Files.readAllBytes(path);
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Укажите нужный тип изображения
                        .body(imageBytes);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
