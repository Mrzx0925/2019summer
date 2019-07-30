/*
Navicat MySQL Data Transfer

Source Server         : 我的MySql
Source Server Version : 80011
Source Host           : localhost:3306
Source Database       : zx

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2019-07-30 14:57:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('181', 'ZHANGXI', '11');
INSERT INTO `user` VALUES ('194', 'ZHANGXI', '11');
INSERT INTO `user` VALUES ('196', 'ZHANGXI', '11');

-- ----------------------------
-- Table structure for `tuser`
-- ----------------------------
DROP TABLE IF EXISTS `tuser`;
CREATE TABLE `tuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2765 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tuser
-- ----------------------------
INSERT INTO `tuser` VALUES ('1', 'admin', 'admin', 'admin');
INSERT INTO `tuser` VALUES ('2762', null, '907436266@qq.com', 'aa');
INSERT INTO `tuser` VALUES ('2764', '15983463152', null, '1');

-- ----------------------------
-- Table structure for `button`
-- ----------------------------
DROP TABLE IF EXISTS `button`;
CREATE TABLE `button` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `tadd` int(11) NOT NULL DEFAULT '0',
  `tdelete` int(11) NOT NULL DEFAULT '0',
  `tupdate` int(11) NOT NULL DEFAULT '0',
  `tquery` int(11) NOT NULL DEFAULT '1',
  `tin` int(11) NOT NULL DEFAULT '0',
  `tout` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `button_ibfk_1` (`userid`),
  CONSTRAINT `button_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `tuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of button
-- ----------------------------
INSERT INTO `button` VALUES ('1', '1', '1', '1', '1', '1', '1', '1');
INSERT INTO `button` VALUES ('7', '2762', '1', '1', '1', '1', '1', '1');
INSERT INTO `button` VALUES ('9', '2764', '0', '0', '0', '1', '1', '0');
