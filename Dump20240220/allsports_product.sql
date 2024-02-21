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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL,
  `product_actual_price` double DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `product_discounted_price` double DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,86.55,'Sneakers nike corut vision low, culoare rosu, material piele eco',56.19,'NIKE  Men Shoes Court Vision Low Red'),(5,79.99,'Nike court vision Low White , material piele eco. At least 20% eco recycled materials used',56.19,'NIKE  Men Shoes Court Vision Low White'),(9,68.99,'Adidas Running Shoes Blue, Talpa softfoam cu absorbtie de schocuri, material textil...',55.49,'Adidas Men Shoes Running Duramo Speed'),(13,43.49,'Material 100% bumbac, culoare maro.',29.99,'THE NORTH FACE T-Shirt Men Tacune'),(20,65,'Set de gantere cu o greutate totala de 20 kg Energetics.',47,'ENERGETICS Weights Set 20Kg'),(22,260,'Placa snowboard',195,'FIREFLY Snowboard Furious Black-Green'),(72,79.99,'NIKE Shoes Kids Volley Omni Multi-Court',49.88,'NIKE Shoes Kids Volley Omni Multi-Court'),(75,64.99,'NIKE  Shoes Kids Air Max SC SE',51.99,'NIKE  Shoes Kids Air Max SC SE'),(77,20.99,'NIKE  Socks unisex Crew Everyday Cushion (3 pairs)',18,'NIKE  Socks unisex Crew Everyday Cushion (3 pairs)'),(79,67.54,'NIKE  Men Hoodie Dri-FIT',52.22,'NIKE  Men Hoodie Dri-FIT'),(81,87.44,'NIKE  Men Tank-Top Milwaukee Bucks',70,'NIKE  Men Tank-Top Milwaukee Bucks'),(83,89.12,'Adidas Full Suit Men 3-Stripes Woven',76.66,'Adidas Full Suit Men 3-Stripes Woven'),(85,25.55,'Adidas Men Shorts Must Haves Badge of Sport',19.99,'Adidas Men Shorts Must Haves Badge of Sport'),(87,82.99,'Adidas  Men Shoes Terrex Boat HEAT.RDY',77.99,'Adidas  Men Shoes Terrex Boat HEAT.RDY'),(90,89.99,'',83.22,''),(94,70,'THE NORTH FACE Women Hoodie W TREND CROP HOODIE',65.44,'THE NORTH FACE Women Hoodie W TREND CROP HOODIE'),(96,40,'THE NORTH FACE Men T-Shirt M NEW ODLES TECH TEE',32.25,'THE NORTH FACE Men T-Shirt M NEW ODLES TECH TEE'),(98,65,'THE NORTH FACE Women Hiking Boots VENTURE FASTHIKE II WP',60.99,'THE NORTH FACE Women Hiking Boots VENTURE FASTHIKE II WP'),(100,155.99,'THE NORTH FACE Hiking Backpack Borealis',139.99,'THE NORTH FACE Hiking Backpack Borealis'),(102,50.99,'THE NORTH FACE Hat unisex Horizon',39.99,'THE NORTH FACE Hat unisex Horizon'),(104,40.79,'THE NORTH FACE Woemen Shorts Logowear',51.39,'THE NORTH FACE Woemen Shorts Logowear');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20  0:42:47
