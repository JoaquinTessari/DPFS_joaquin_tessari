USE tessari_tech_db;

-- Populate user_categories
INSERT INTO user_categories (id, name) VALUES 
(1, 'admin'),
(2, 'customer');

-- Populate users
INSERT INTO users (id, first_name, last_name, email, password, image, user_category_id) VALUES 
(1, 'Super', 'Admin', 'superadmin@admin.com', '$2b$10$xxn3m/xe/fDOtnKkfXRlCO4QSra5Ax8tSlSoW7jTr7aj0QNSirkkG', '/images/users/admin.png', 1);

-- Populate brands
INSERT INTO brands (id, name) VALUES 
(1, 'Apple'),
(2, 'Samsung'),
(3, 'Sony'),
(4, 'LG'),
(5, 'Keychron'),
(6, 'Logitech'),
(7, 'Nintendo'),
(8, 'JBL'),
(9, 'Canon'),
(10, 'Microsoft'),
(11, 'Corsair'),
(12, 'DJI');

-- Populate categories
INSERT INTO categories (id, name) VALUES 
(1, 'Computación'),
(2, 'Celulares'),
(3, 'Audio'),
(4, 'Gaming'),
(5, 'Periféricos'),
(6, 'TV'),
(7, 'Fotografía'),
(8, 'Muebles');

-- Populate colors
INSERT INTO colors (id, name) VALUES 
(1, 'Gris Espacial'),
(2, 'Plata'),
(3, 'Oro'),
(4, 'Negro'),
(5, 'Verde'),
(6, 'Crema'),
(7, 'Blanco'),
(8, 'Neón'),
(9, 'Azul'),
(10, 'Rosa'),
(11, 'Púrpura'),
(12, 'Grafito'),
(13, 'Gris Pálido'),
(14, 'Rojo'),
(15, 'Camuflaje'),
(16, 'Gris');

-- Populate products
INSERT INTO products (id, name, description, price, image, brand_id, category_id) VALUES 
(2, 'Apple MacBook Air M1', 'La notebook más delgada y ligera de Apple viene con los superpoderes del chip M1.', 249999.00, 'macbook-air.jpg', 1, 1),
(3, 'Samsung Galaxy S23 Ultra', 'El Galaxy S23 Ultra viene con una cámara de 200MP y chip más rápido.', 299999.00, 's23-ultra.jpg', 2, 2),
(4, 'Auriculares Sony WH-1000XM5', 'Nuestra tecnología de Noise Cancelling líder del sector.', 89999.00, 'sony-headphones.jpg', 3, 3),
(5, 'Monitor LG UltraGear 27"', 'Monitor Gaming con pantalla IPS, 144Hz y 1ms de respuesta.', 110000.00, 'monitor-lg.jpg', 4, 4),
(6, 'Teclado Mecánico Keychron K2', 'Teclado mecánico inalámbrico con switches Gateron Blue.', 45000.00, 'keychron-k2.jpg', 5, 5),
(7, 'Mouse Logitech MX Master 3S', 'Un ícono remasterizado. Siente cada momento de tu flujo de trabajo.', 38000.00, 'mx-master-3s.jpg', 6, 5),
(8, 'Nintendo Switch OLED', 'Disfruta de colores intensos y un alto contraste en una pantalla de 7 pulgadas.', 105000.00, 'switch-oled.jpg', 7, 4),
(9, 'iPad Air 5ta Gen', 'Con la potencia del chip M1 de Apple.', 180000.00, 'ipad-air.jpg', 1, 1),
(10, 'Smart TV Samsung 55" 4K', 'Colores cristalinos y vivos. Procesador Crystal 4K.', 135000.00, 'samsung-tv.jpg', 2, 6),
(11, 'JBL Flip 6', 'El ritmo no para con el sistema de altavoces de 2 vías.', 32000.00, 'jbl-flip6.jpg', 8, 3),
(12, 'Cámara Canon EOS R50', 'Cámara mirrorless ligera y compacta.', 350000.00, 'canon-r50.jpg', 9, 7),
(13, 'Xbox Series X', 'La Xbox más rápida y potente de la historia.', 155000.00, 'xbox-series-x.jpg', 10, 4),
(14, 'Silla Gamer Corsair T3 Rush', 'Inspirada en el automovilismo de alto rendimiento.', 95000.00, 'corsair-chair.jpg', 11, 8),
(15, 'Drone DJI Mini 3', 'Vuela más tiempo y captura más con una duración de batería mejorada.', 210000.00, 'dji-mini-3.jpg', 12, 7);

-- Populate product_colors
INSERT INTO product_colors (product_id, color_id) VALUES 
(2, 1), (2, 2), (2, 3), -- MacBook Air
(3, 4), (3, 5), (3, 6), -- S23 Ultra
(4, 4), (4, 2), -- Sony Headphones
(5, 4), -- LG Monitor
(6, 16), -- Keychron
(7, 12), (7, 13), -- MX Master 3S
(8, 7), (8, 8), -- Switch
(9, 9), (9, 10), (9, 11), (9, 1), -- iPad Air
(10, 4), -- Samsung TV
(11, 14), (11, 9), (11, 4), (11, 15), -- JBL Flip
(12, 4), (12, 7), -- Canon R50
(13, 4), -- Xbox
(14, 16), (14, 4), -- Corsair (Assuming close matches: Gris/Blanco -> Gris, Gris/Carbón -> Negro for simplicity or mapping to id 16 and 4)
(15, 16); -- Drone
