SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bases
-- ----------------------------
DROP TABLE IF EXISTS `bases`;
CREATE TABLE `bases`
(
    `id`   int(11)      NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8mb4;

-- ----------------------------
-- Records of bases
-- ----------------------------
BEGIN;
INSERT INTO `bases`
VALUES (1, 'rice noodles');
INSERT INTO `bases`
VALUES (2, 'egg noodlee');
INSERT INTO `bases`
VALUES (3, 'white rice');
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`
(
    `id`         int(11)      NOT NULL AUTO_INCREMENT,
    `name`       varchar(255) NOT NULL,
    `address`    varchar(255) NOT NULL,
    `base_id`    int(11)      NOT NULL,
    `topping_id` int(11)      NOT NULL,
    `status_id`  int(11)      NOT NULL,
    PRIMARY KEY (`id`),
    KEY `base_id` (`base_id`),
    KEY `topping_id` (`topping_id`),
    KEY `status_id` (`status_id`),
    CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`base_id`) REFERENCES `bases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`topping_id`) REFERENCES `toppings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`
(
    `id`   int(11)      NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8mb4;

-- ----------------------------
-- Records of status
-- ----------------------------
BEGIN;
INSERT INTO `status`
VALUES (1, 'ordered');
INSERT INTO `status`
VALUES (2, 'inprogress');
INSERT INTO `status`
VALUES (3, 'done');
COMMIT;

-- ----------------------------
-- Table structure for toppings
-- ----------------------------
DROP TABLE IF EXISTS `toppings`;
CREATE TABLE `toppings`
(
    `id`   int(11)      NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4
  DEFAULT CHARSET = utf8mb4;

-- ----------------------------
-- Records of toppings
-- ----------------------------
BEGIN;
INSERT INTO `toppings`
VALUES (1, 'chicken');
INSERT INTO `toppings`
VALUES (2, 'beef');
INSERT INTO `toppings`
VALUES (3, 'smoked tofu');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
