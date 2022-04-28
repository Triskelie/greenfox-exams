DROP TABLE IF EXISTS `bases`;
CREATE TABLE `bases`
(
    `id`   INTEGER PRIMARY KEY,
    `name` varchar(255) NOT NULL
);

-- ----------------------------
-- Records of bases
-- ----------------------------
BEGIN;
INSERT INTO `bases`
VALUES (1, 'rice noodles');
INSERT INTO `bases`
VALUES (2, 'egg noodles');
INSERT INTO `bases`
VALUES (3, 'white rice');
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`
(
    `id`         INTEGER PRIMARY KEY,
    `name`       varchar(255) NOT NULL,
    `address`    varchar(255) NOT NULL,
    `base_id`    int(11)      NOT NULL,
    `topping_id` int(11)      NOT NULL,
    `status_id`  int(11)      NOT NULL
);

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
    `id`   INTEGER PRIMARY KEY,
    `name` varchar(255) NOT NULL
);

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
    `id`   INTEGER PRIMARY KEY,
    `name` varchar(255) NOT NULL
);

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
