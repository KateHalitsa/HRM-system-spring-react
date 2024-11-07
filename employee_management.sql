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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee` */

insert  into `employee`(`id`,`first_name`,`last_name`,`birthday`) values 
(1,'Екатерина','Галица','2003-04-15 09:00:00'),
(2,'Александр','Завадский','2010-05-05 09:00:00'),
(3,'Татьяна','Куленкович','2002-05-07 09:00:00');

/*Table structure for table `employee_position` */

DROP TABLE IF EXISTS `employee_position`;

CREATE TABLE `employee_position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee_position` */

/*Table structure for table `employee_position_feature` */

DROP TABLE IF EXISTS `employee_position_feature`;

CREATE TABLE `employee_position_feature` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `employee_position_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emploee_position_id` (`employee_position_id`),
  CONSTRAINT `emploee_position_id` FOREIGN KEY (`employee_position_id`) REFERENCES `employee_position` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee_position_feature` */

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee_workplace` */

/*Table structure for table `empoyee_feature` */

DROP TABLE IF EXISTS `empoyee_feature`;

CREATE TABLE `empoyee_feature` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `feature_id` int DEFAULT NULL,
  `value` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `employee_position_feature` (`feature_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `employee_position_feature` FOREIGN KEY (`feature_id`) REFERENCES `employee_position_feature` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `empoyee_feature` */

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
(31,7,1),
(32,7,3),
(33,7,4),
(36,2,4),
(39,7,2),
(40,7,5),
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`login`,`password`,`email`,`employee_id`) values 
(1,'kate','kate','kate@gmail12.com',NULL),
(2,'alex2','alex','alex@gmail345.com',NULL),
(5,'test11156d','','test2225',NULL),
(7,'test1234 5','test','test@mail.ru',NULL);

/*Table structure for table `workplace` */

DROP TABLE IF EXISTS `workplace`;

CREATE TABLE `workplace` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `employee_position_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_position_id` (`employee_position_id`),
  CONSTRAINT `employee_position_id` FOREIGN KEY (`employee_position_id`) REFERENCES `employee_position` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `workplace` */

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `workplace_feature` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
