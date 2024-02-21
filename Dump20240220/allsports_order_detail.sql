-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: allsports
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `order_id` int NOT NULL,
  `order_alternate_contact_number` varchar(255) DEFAULT NULL,
  `order_amount` double DEFAULT NULL,
  `order_contact_number` varchar(255) DEFAULT NULL,
  `order_full_address` varchar(255) DEFAULT NULL,
  `order_full_name` varchar(255) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `product_product_id` int DEFAULT NULL,
  `user_user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FKm7asbwck993r4yi0olqeqxcda` (`product_product_id`),
  KEY `FKfu3eq3b46igyg3wf6aa3cwpvm` (`user_user_name`),
  CONSTRAINT `FKfu3eq3b46igyg3wf6aa3cwpvm` FOREIGN KEY (`user_user_name`) REFERENCES `user` (`user_name`),
  CONSTRAINT `FKm7asbwck993r4yi0olqeqxcda` FOREIGN KEY (`product_product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (27,'123',119,'0746354280','Str. Soarelui','Vasile Bledea','Placed',13,'cristi20'),(28,'123',459,'0746354280','Str. Soarelui','Vasile Bledea','Placed',22,'cristi20'),(29,'123',214,'0746354280','Str. Soarelui','Vasile Bledea','Placed',20,'cristi20'),(35,'',259,'','','','Placed',1,'user123'),(36,'',119,'','','','Placed',13,'user123'),(37,'',459,'','','','Placed',22,'user123'),(38,'',518,'','','','Placed',1,'user123'),(42,'',299,'','','','Placed',5,'user123'),(43,'',119,'','','','Placed',13,'user123'),(44,'',259,'','','','Placed',1,'user123'),(47,'',259,'','','','Placed',1,'user123'),(48,'',199,'','','','Placed',9,'user123'),(51,'',897,'','','','Placed',5,'user123'),(52,'',518,'','','','Placed',1,'user123'),(118,'',56.19,'','','','Placed',5,'user123'),(119,'',56.19,'','','','Placed',1,'user123'),(120,'',49.88,'','','','Placed',72,'user123'),(121,'',47,'','','','Placed',20,'user123'),(122,'',29.99,'','','','Placed',13,'user123'),(123,'',51.99,'','','','Placed',75,'user123'),(124,'',18,'','','','Placed',77,'user123'),(125,'',52.22,'','','','Placed',79,'user123');
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20  0:42:46
