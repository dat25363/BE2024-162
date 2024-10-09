use BE2024_162;

INSERT INTO brands (brand_name) VALUES
('Caterpillar'),
('Podemcrane'),
('Komatsu'),
('Hitachi'),
('Liebherr');

INSERT INTO products (product_name, img, city, brand_id, release_year, p_condition, delivery_status, issold, price) VALUES
('Máy xúc Caterpillar 320', 'img1.jpg', 'Hà Nội', 1, 2020, 'Mới', 'Sẵn sàng', false, 600000),
('Xe tải Komatsu HD325-7', 'img1.jpg', 'Bắc Ninh', 2, 2021, 'Cũ', 'Sẵn sàng', false, 800000),
('Máy kéo Hitachi ZAXIS 135', 'img1.jpg', 'Hải Phòng', 3, 2019, 'Mới', 'Sẵn sàng', false, 700000),
('Xe nâng Liebherr LTM 1040', 'img1.jpg', 'Thanh Hóa', 1, 2022, 'Mới', 'Sẵn sàng', false, 1200000),
('Máy đào Podemcrane SCX1500A-2', 'img1.jpg', 'Nghệ An', 4, 2020, 'Cũ', 'Sẵn sàng', false, 900000),
('Máy ủi Komatsu D65EX-18', 'img1.jpg', 'Bà Rịa', 5, 2021, 'Mới', 'Sẵn sàng', false, 1100000),
('Xe cẩu Caterpillar 340', 'img1.jpg', 'Bạc Liêu', 2, 2022, 'Mới', 'Sẵn sàng', false, 1300000),
('Máy trộn bê tông Hitachi HBT-60', 'img1.jpg', 'Bảo Lộc', 3, 2019, 'Cũ', 'Sẵn sàng', false, 500000),
('Xe xúc lật Liebherr L 550', 'img1.jpg', 'Bắc Giang', 4, 2020, 'Mới', 'Sẵn sàng', false, 950000),
('Máy khoan Podemcrane PS-32', 'img1.jpg', 'Bắc Kạn', 5, 2021, 'Cũ', 'Sẵn sàng', false, 400000),
('Máy cắt bê tông Caterpillar C9', 'img1.jpg', 'Hà Nội', 1, 2022, 'Mới', 'Sẵn sàng', false, 650000),
('Máy ép cọc Komatsu PC200-8', 'img1.jpg', 'Bắc Ninh', 2, 2019, 'Cũ', 'Sẵn sàng', false, 850000),
('Xe tải Hitachi EH5000AC-3', 'img1.jpg', 'Hải Phòng', 3, 2020, 'Mới', 'Sẵn sàng', false, 1500000),
('Máy kéo Liebherr PR 736', 'img1.jpg', 'Thanh Hóa', 1, 2021, 'Mới', 'Sẵn sàng', false, 1250000),
('Xe nâng Podemcrane GPK 25', 'img1.jpg', 'Nghệ An', 4, 2020, 'Cũ', 'Sẵn sàng', false, 300000),
('Máy xúc Caterpillar 325B', 'img1.jpg', 'Bà Rịa', 5, 2019, 'Mới', 'Sẵn sàng', false, 720000),
('Xe bồn bê tông Komatsu MITSUBISHI FUSO', 'img1.jpg', 'Bạc Liêu', 2, 2022, 'Mới', 'Sẵn sàng', false, 1300000),
('Máy nghiền đá Hitachi ZW220', 'img1.jpg', 'Bảo Lộc', 3, 2021, 'Cũ', 'Sẵn sàng', false, 400000),
('Xe cẩu Liebherr LTM 1300', 'img1.jpg', 'Bắc Giang', 4, 2020, 'Mới', 'Sẵn sàng', false, 1800000),
('Máy xúc lật Podemcrane ZL30', 'img1.jpg', 'Bắc Kạn', 5, 2021, 'Cũ', 'Sẵn sàng', false, 600000);

INSERT INTO userGroups (group_name) VALUES
('admin'),
('user');

INSERT INTO permissions (permission_name) VALUES
('view products'),
('delete products'),
('add products'),
('update products');

INSERT INTO groupPermission (userGroupId, permissionId) VALUES
(1, 1),  -- admin - view products
(1, 2),  -- admin - delete products
(1, 3),  -- admin - add products
(1, 4),  -- admin - update products
(2, 1);  -- user - view products

INSERT INTO users(phone,pass,userGroup_id) VALUES
('admin','$2a$12$Z5FZahud2tI2JRfAyy.iO.b6Rdg6fwRbCIzo7AbiKbt9ABOqRYbBy',1),
('user','$2a$12$sgRf9EniS2D2IguqZAQDr.EU9dBdwSA6x2VfLL9yTWBfnwUsb/2US',2);

INSERT INTO routes(route_name) VALUES
("search product");

INSERT INTO routePermission(routeId,permissionId) VALUES
(1, 1); -- search product - view products