/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 8.0.32 : Database - employee_management
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`employee_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `employee_management`;

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee` */

insert  into `employee`(`id`,`first_name`,`last_name`,`birthday`) values 
(1,'Екатерина','Галица','2003-04-15 09:00:00'),
(2,'Александр','Завадский','2010-05-05 09:00:00'),
(3,'Татьяна','Куленкович','2002-05-07 09:00:00'),
(5,'Владимир ','Вержбицкий','2001-11-13 10:00:00'),
(6,'Агнесса','Гарэза','2003-05-25 09:00:00'),
(7,'Мария','Завадская','1978-06-22 09:00:00'),
(8,'Илона','Камасина','2003-05-25 09:00:00'),
(9,'Георгий','Ганчар','2025-04-07 14:08:39');

/*Table structure for table `employee_feature` */

DROP TABLE IF EXISTS `employee_feature`;

CREATE TABLE `employee_feature` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `feature_id` int DEFAULT NULL,
  `value` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `employee_position_feature` (`feature_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `employee_position_feature` FOREIGN KEY (`feature_id`) REFERENCES `employee_position_feature` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee_feature` */

insert  into `employee_feature`(`id`,`employee_id`,`feature_id`,`value`) values 
(1,1,1,6),
(2,1,2,6),
(3,3,1,6),
(4,3,2,4),
(5,1,3,6),
(6,5,4,8),
(7,5,5,7),
(8,5,3,9),
(9,5,2,5),
(10,5,1,7),
(11,6,4,7),
(12,6,5,8),
(13,6,3,7),
(14,6,2,4),
(15,6,1,7),
(16,3,4,8),
(17,3,5,7),
(18,3,3,7),
(19,1,4,6),
(20,1,5,6),
(21,2,4,7),
(22,2,5,6),
(23,2,3,6),
(24,2,2,5),
(25,2,1,5),
(26,7,4,20),
(27,7,5,12),
(28,7,3,34),
(29,7,2,12),
(30,7,1,3),
(31,8,4,5),
(32,8,5,6),
(33,8,3,2),
(34,8,2,3),
(35,8,1,2);

/*Table structure for table `employee_position` */

DROP TABLE IF EXISTS `employee_position`;

CREATE TABLE `employee_position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee_position` */

insert  into `employee_position`(`id`,`name`) values 
(1,'Тестировщик'),
(2,'Переводчик'),
(3,'Программист'),
(4,'Дизайнер');

/*Table structure for table `employee_position_feature` */

DROP TABLE IF EXISTS `employee_position_feature`;

CREATE TABLE `employee_position_feature` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `employee_position_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emploee_position_id` (`employee_position_id`),
  CONSTRAINT `emploee_position_id` FOREIGN KEY (`employee_position_id`) REFERENCES `employee_position` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee_position_feature` */

insert  into `employee_position_feature`(`id`,`name`,`employee_position_id`) values 
(1,'Знание языка запросов SQL',1),
(2,'Знание основ тестирования',1),
(3,'Знание языка Java',3),
(4,'Знание английского ',NULL),
(5,'Знание Angular',3),
(6,'Художественное образование',4),
(7,'Общительность',NULL);

/*Table structure for table `employee_workplace` */

DROP TABLE IF EXISTS `employee_workplace`;

CREATE TABLE `employee_workplace` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `from_date` datetime DEFAULT NULL,
  `to_date` datetime DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  `workplace_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employee_id` (`employee_id`),
  KEY `fk_workplace_id` (`workplace_id`),
  CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_workplace_id` FOREIGN KEY (`workplace_id`) REFERENCES `workplace` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee_workplace` */

insert  into `employee_workplace`(`id`,`employee_id`,`from_date`,`to_date`,`approved`,`workplace_id`) values 
(1,1,'2024-12-01 18:47:16','2024-12-31 09:00:00',1,1),
(2,1,'2025-01-30 00:00:00','2026-01-30 00:00:00',0,4),
(4,3,'2025-01-30 00:00:00','2026-01-30 00:00:00',0,1),
(7,5,'2024-12-16 11:18:55','2025-12-16 11:18:55',0,4),
(9,8,'2024-12-16 11:18:55','2025-12-16 11:18:55',0,5);

/*Table structure for table `project` */

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_finish` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `project` */

insert  into `project`(`id`,`name`,`date_start`,`date_finish`) values 
(1,'Проект 1','2025-03-14 00:00:00','2025-05-09 00:00:00'),
(2,'Проект 2','2025-01-22 00:00:00','2025-04-10 00:00:00'),
(3,'Проект 3','2025-03-10 00:00:00','2026-03-31 00:00:00'),
(6,'Сайт Гомельской юстиции','2025-04-01 00:00:00','2025-06-13 00:00:00');

/*Table structure for table `project_progress` */

DROP TABLE IF EXISTS `project_progress`;

CREATE TABLE `project_progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `planned_percentage` int DEFAULT NULL,
  `execution_percentage` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projectId` (`project_id`),
  CONSTRAINT `projectId` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `project_progress` */

insert  into `project_progress`(`id`,`project_id`,`date`,`planned_percentage`,`execution_percentage`) values 
(11,NULL,'2025-04-14 00:00:00',50,0),
(12,NULL,'2025-05-14 00:00:00',50,0),
(13,NULL,'2025-04-14 00:00:00',50,0),
(14,NULL,'2025-05-14 00:00:00',50,0),
(15,NULL,'2025-04-14 00:00:00',50,0),
(16,NULL,'2025-05-14 00:00:00',50,0),
(44,1,'2025-04-14 00:00:00',50,45),
(45,1,'2025-05-14 00:00:00',100,80),
(46,2,'2025-02-22 00:00:00',33,0),
(47,2,'2025-03-22 00:00:00',66,50),
(48,2,'2025-04-22 00:00:00',100,75),
(49,3,'2025-04-10 00:00:00',8,0),
(50,3,'2025-05-10 00:00:00',16,0),
(51,3,'2025-06-10 00:00:00',25,0),
(52,3,'2025-07-10 00:00:00',33,0),
(53,3,'2025-08-10 00:00:00',41,0),
(54,3,'2025-09-10 00:00:00',50,0),
(55,3,'2025-10-10 00:00:00',58,0),
(56,3,'2025-11-10 00:00:00',66,0),
(57,3,'2025-12-10 00:00:00',75,0),
(58,3,'2026-01-10 00:00:00',83,0),
(59,3,'2026-02-10 00:00:00',91,0),
(60,3,'2026-03-10 00:00:00',100,0);

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `role` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `roles` */

insert  into `roles`(`id`,`name`) values 
(1,'Администратор'),
(2,'Сотрудник отдела кадров'),
(3,'Проводящий интервью'),
(4,'Менеджер по кадрам'),
(5,'Директор');

/*Table structure for table `user_role` */

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user_id`),
  KEY `role` (`role_id`),
  CONSTRAINT `role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user_role` */

insert  into `user_role`(`id`,`user_id`,`role_id`) values 
(24,2,1),
(36,2,4),
(41,5,2),
(43,5,1),
(44,5,5),
(46,1,3),
(47,1,4),
(48,1,2),
(49,1,1),
(50,1,5);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee` (`employee_id`),
  CONSTRAINT `employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`login`,`password`,`email`,`employee_id`) values 
(1,'kate','kate','kate@gmail1.com',1),
(2,'alex','alex','alex@gmail345.com',2),
(5,'tatiana','tatiana','tatiana@gmail.com',3),
(8,'vladislave','vladislave','vladislavemegamind@gmail.com',5),
(9,'agneshka','kozzanostra','agneshkaHareza@gmail.com',6),
(10,'ilanaKamasina','vothik','ilanaKamasina@gmail.com',8);

/*Table structure for table `workplace` */

DROP TABLE IF EXISTS `workplace`;

CREATE TABLE `workplace` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `employee_position_id` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_position_id` (`employee_position_id`),
  KEY `fk_workplace_project_id` (`project_id`),
  CONSTRAINT `employee_position_id` FOREIGN KEY (`employee_position_id`) REFERENCES `employee_position` (`id`),
  CONSTRAINT `fk_workplace_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `workplace` */

insert  into `workplace`(`id`,`name`,`employee_position_id`,`project_id`) values 
(1,'Junior QA-инженер',1,3),
(2,'Переводчик технических текстов',2,1),
(3,'Senior QA-инженер',1,1),
(4,'back-end разработчик',3,1),
(5,'front-end разработчик',3,2),
(6,'Главный дизайнер',4,3);

/*Table structure for table `workplace_feature` */

DROP TABLE IF EXISTS `workplace_feature`;

CREATE TABLE `workplace_feature` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature_id` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `workplace_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `feature_id` (`feature_id`),
  KEY `workplace` (`workplace_id`),
  CONSTRAINT `feature_id` FOREIGN KEY (`feature_id`) REFERENCES `employee_position_feature` (`id`),
  CONSTRAINT `workplace` FOREIGN KEY (`workplace_id`) REFERENCES `workplace` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `workplace_feature` */

insert  into `workplace_feature`(`id`,`feature_id`,`weight`,`workplace_id`) values 
(1,1,7,1),
(2,2,7,1),
(3,3,9,4),
(4,4,10,2),
(5,4,6,1),
(6,4,5,5),
(7,5,8,5),
(8,3,1,5),
(9,4,7,4),
(10,5,1,4),
(11,4,7,3),
(12,2,8,3),
(13,1,8,3),
(14,4,2,6),
(15,7,5,6),
(16,6,3,6);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
