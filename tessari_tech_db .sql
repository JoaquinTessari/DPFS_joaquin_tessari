-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-01-2026 a las 07:34:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tessari_tech_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
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
(12, 'Generico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Computación'),
(3, 'Audio'),
(4, 'Gaming'),
(9, 'Ofertas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `colors`
--

INSERT INTO `colors` (`id`, `name`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total`, `created_at`, `updated_at`) VALUES
(7, 1, 149999.00, '2026-01-07 05:27:58', '2026-01-07 05:27:58'),
(8, 1, 328973.00, '2026-01-07 06:27:12', '2026-01-07 06:27:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `name`, `price`, `quantity`, `created_at`, `updated_at`) VALUES
(7, 7, 16, 'Gabinete Deepcool CH270 Digital M-ATX', 149999.00, 1, '2026-01-07 05:27:58', '2026-01-07 05:27:58'),
(8, 8, 28, 'Sony PlayStation 3 Super Slim 250GB Grand Theft Auto V color charcoal black 2013', 328973.00, 1, '2026-01-07 06:27:12', '2026-01-07 06:27:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `brand_id`, `category_id`, `created_at`, `updated_at`) VALUES
(8, 'Nintendo Switch OLED', 'Consola Nintendo Switch OLED Blanco Versión Japonesa\r\n\r\nCon tu consola Switch tendrás entretenimiento asegurado todos los días. Su tecnología fue creada para poner nuevos retos tanto a jugadores principiantes como expertos.\r\n\r\nSwitch se convirtió en una de las consolas más versátiles del mercado gracias a su uso portátil y de sobremesa. Nintendo desarrolló este modelo con el objetivo de tener todas las comodidades de la tecnología de elite en un aparato portátil con el que podrás jugar y disfrutar de diverso contenido online.\r\n\r\nLos Joy-con cuentan con botones especiales para realizar print de pantalla. Además, posee una cámara infrarroja que puede leer la distancia respecto a los objetos e incluso detectar formas.\r\nGuarda tus apps, fotos, videos y mucho más en el disco duro, que cuenta con una capacidad de 64 GB.\r\n\r\nVas a poder reproducir música, ver tus películas y series favoritas a través de las aplicaciones descargables.\r\n\r\nQue incluye la caja?\r\n1 dock\r\n2 correas para Joy-Con\r\n1 Joy-Con grip\r\n1 cable HDMI\r\n1 adaptador de corriente\r\n1 guía de inicio rápido\r\nJuego Super Mario Bros Wonder\r\n', 799000.00, '/images/1767742160850.jpg', 7, 4, '2026-01-06 23:20:44', '2026-01-07 03:01:05'),
(16, 'Gabinete Deepcool CH270 Digital M-ATX', 'Gabinete Deepcool CH270 Digital M-ATX\r\n\r\n', 149999.00, '/images/1767754853186.webp', NULL, 1, '2026-01-07 03:00:53', '2026-01-07 03:00:53'),
(17, 'Parlante JBL Go 4 Go 4 portátil con bluetooth waterproof azul', 'JBL Go 4 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.\r\n\r\nOlvidate del amplificador\r\nAl ser activo solo necesitarás conectarlo a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que uno pasivo. Es la solución más conveniente si querés producir música en tu casa o en un estudio, y también para DJs.\r\n\r\nApto para aire libre\r\nUsalo en donde quieras, este dispositivo está diseñado para que tengas el mejor sonido siempre, tanto en interiores como en exteriores.', 84444.00, '/images/1767754950703.webp', NULL, 3, '2026-01-07 03:02:30', '2026-01-07 03:02:30'),
(18, 'Micrófono Jbl Quantum Stream, doble condensador con cable y LED negro', 'El micrófono Jbl Quantum Stream Rgb Black Gamer es perfecto para los amantes de los juegos y la transmisión. Con la calidad de la reconocida marca JBL, este micrófono con cable ofrece una experiencia inmersiva y profesional. Con dos micrófonos de estudio, obtendrás una captación de audio clara y de alta calidad. Además, el micrófono tiene una luz LED y un indicador de funcionamiento, lo que añade un toque de estilo a tu configuración. Con una frecuencia mínima y máxima de 20 Hz, tendrás un sonido equilibrado e inmersivo. El patrón polar omnidireccional garantiza que tu voz se capte con claridad en todas las direcciones. La sensibilidad de -3 dB garantiza una captación precisa y sin distorsiones. Saca el máximo partido a tus juegos, podcasts y transmisiones con el micrófono Jbl Quantum Stream Rgb Black Gamer.', 159999.00, '/images/1767755006896.webp', NULL, 3, '2026-01-07 03:03:26', '2026-01-07 03:03:26'),
(20, 'PlayStation 5 Slim', 'Consola Playstation Ps5 Digital Fortnite 1TB Color Blanco\r\n\r\nPlayStation 5 Slim 1TB Fortnite Digital es la consola de sobremesa que redefine la experiencia de juego. Con su diseño elegante y compacto, esta versión Slim ofrece un rendimiento excepcional y una capacidad de almacenamiento de 1 TB, ideal para guardar tus juegos favoritos y contenido adicional.\r\n\r\nIncluye un joystick de alta precisión que te permitirá disfrutar de un control total en cada partida.\r\n\r\nSumérgete en un mundo de gráficos impresionantes y velocidad de carga rápida, gracias a la tecnología de última generación de Sony. La PlayStation 5 Slim es la elección perfecta para los gamers que buscan calidad y rendimiento.', 1110000.00, '/images/1767755180014.webp', 12, 9, '2026-01-07 03:06:20', '2026-01-07 06:06:49'),
(21, 'Joystick Inalambrico Compatible Con Pc Celular Y Ps4 Color Azul', 'Control preciso\r\nEste mando combina funciones revolucionarias mientras conserva precisión, comodidad y exactitud en cada movimiento. Gracias a su ergonomía especialmente pensada para la posición de tu mano, podés pasar horas jugando con total confort.\r\n\r\nMayor comodidad y realismo\r\nTe permite jugar sin necesidad de que haya cables de por medio. Está pensado no solamente para controlar mejor tus videojuegos, sino también para aumentar su realismo y experiencia.\r\n\r\nActivá el Bluetooth\r\nCuenta con conexión Bluetooth de alta tecnología para usarlo en tu consola ps4. Para utilizarlo en PC O WINDOWS deberas utilizar el cable usb provisto en la caja . Además, posee gran capacidad antiinterferente, fácil manejo y señal de conexión estable.\r\n\r\nDimensión adicional para tus juegos\r\nCon pantalla táctil, mucho más conveniente y fácil de usar.', 500000.00, '/images/1767755298954.webp', NULL, 9, '2026-01-07 03:08:18', '2026-01-07 03:15:12'),
(22, 'Notebook Gamer Asus TUF Gaming F15 15.6\" FX507ZC4 Intel Core i5-12500H 16GB Ram 512Gb SSD NVIDIA GeForce RTX 3050 144Hz Windows 11', 'ASUS TUF Gaming F15 FX507ZC4-HN087W es una notebook gamer robusta y confiable, ideal para quienes buscan rendimiento sólido en juegos y tareas exigentes. Equipada con procesador Intel Core i5-12450H de 12ª generación (8 núcleos, hasta 4.4 GHz) y tarjeta gráfica dedicada NVIDIA GeForce RTX 3050 Laptop GPU con 4GB GDDR6, ofrece una experiencia fluida en títulos populares y aplicaciones creativas.', 2219999.00, '/images/1767755778191.webp', NULL, 1, '2026-01-07 03:16:18', '2026-01-07 03:16:18'),
(23, 'Notebook Hp Gaming Victus 15-fd3024la AMD Ryzen 7 7445h 8gb 512gb Nvidia Geforce Rtx 3050 4gb Windows 11 Home', 'Notebook Victus Gaming 15-fb3024la\r\n\r\nLa notebook HP Victus está diseñada para ofrecer una excelente experiencia de juego en PC mientras te desplazas. Esta elegante máquina cuenta con un potente procesador AMD y gráficos modernos. Su diseño es tan impresionante como su hardware, con múltiples opciones de color, un sistema térmico optimizado y una cámara web con reducción de ruido temporal.\r\n', 2309999.00, '/images/1767755996235.webp', NULL, 1, '2026-01-07 03:19:56', '2026-01-07 03:19:56'),
(24, 'Notebook HP Gaming Victus 15-fa2010la, Intel Core i5, 16 GB RAM, NVIDIA GeForce RTX 4050, 512 GB SSD, Windows 11 Home', 'Notebook Victus Gaming 15-fa2010la (BA1U2LA)\r\n\r\nCrea y Juega donde sea\r\n¡Prepárate para ganar con la Victus 15! Diseñada para gamers que quieren entrar al mundo de las PCs de alto rendimiento, esta notebook lo tiene todo: el poder del procesador Intel Core, gráficos de última generación y las herramientas de personalización de OMEN Gaming Hub para optimizar cada partida. Todo esto en un diseño compacto y elegante de 15\", con colores épicos para que elijas el que mejor encaje con tu estilo.\r\n', 2939999.00, '/images/1767756056788.webp', NULL, 1, '2026-01-07 03:20:56', '2026-01-07 03:20:56'),
(25, 'Pc Gamer Armada G6550 Amd Ryzen 7 5700 32GB 1TB RTX 3050', 'Especificaciones técnicas:\r\n\r\n- Gabinete armado\r\n- Motherboard A520\r\n- Procesador Amd Ryzen 7 5700 3.7Ghz - AM4\r\n- Memoria 32 Gb\r\n- Disco Sólido SSD 1TB\r\n- Placa de video Nvidia Geforce RTX 3050\r\n- Fuente de alimentación Certificada 80 plus\r\n', 1530999.00, '/images/1767756128626.webp', NULL, 9, '2026-01-07 03:22:08', '2026-01-07 03:22:22'),
(26, 'Auriculares Gamer G435 Logitech G Wireless Gaming Headset Color Negro/Amarillo fluorescente', '', 127560.00, '/images/1767756262957.webp', NULL, 3, '2026-01-07 03:24:22', '2026-01-07 03:24:50'),
(27, 'Auriculares Gamer Inalámbricos Redragon Zeus Pro H510-pro Usb/bluetooth 7.1 Color Negro', 'MARCA: Redragon\r\nMODELO: Zeus Pro H510\r\n\r\nDISEÑO\r\n¡Entra en el juego con los auriculares Redragon Zeus Pro Gamer!\r\nCon un diseño ergonómico y minimalista, conexión USB wireless/BT y almohadillas suaves para una comodidad duradera, estos auriculares ofrecen una experiencia inmersiva y cómoda en todas las configuraciones.\r\n\r\nMODERNO\r\nDisfrute de una calidad de sonido real y sin pérdidas con la tecnología de sonido envolvente 7.1, creando una inmersión total en el campo de juego, escuchando un show en vivo o en una sala de chat.\r\n\r\nCOMODIDAD\r\nLigero y equipado con cojines ultrasuaves y diadema acolchada, el Zeus Pro proporciona horas de diversión con extrema comodidad.\r\n\r\nCONSTRUCCIÓN\r\nEl Zeus Pro, al igual que la versión original, está fabricado en plástico ABS de alta calidad, y tiene un cuerpo mate y diadema recubierta de cuero, entregando una apariencia sobria, de extremo buen gusto y mayor durabilidad.', 141411.00, '/images/1767756343305.webp', NULL, 3, '2026-01-07 03:25:43', '2026-01-07 03:25:43'),
(28, 'Sony PlayStation 3 Super Slim 250GB Grand Theft Auto V color charcoal black 2013', 'La Sony PlayStation 3 Super Slim de 250 GB es la consola ideal para los amantes de los videojuegos que buscan una experiencia de juego envolvente y de alta calidad. Con su diseño compacto y elegante, esta consola no solo ahorra espacio, sino que también ofrece un rendimiento excepcional gracias a su potente CPU Cell Broadband Engine y GPU RSX.\r\n\r\nCon conectividades avanzadas como Bluetooth, HDMI y Wi-Fi, podrás disfrutar de una experiencia de juego conectada y sin interrupciones. Además, su resolución máxima de salida de video de 1920 px x 1080 px garantiza gráficos impresionantes que realzan cada detalle de tus juegos favoritos.\r\n\r\nLa consola viene con un control inalámbrico, lo que te brinda la libertad de moverte mientras juegas. Con la PlayStation 3 Super Slim, no solo obtienes una consola, sino una puerta de entrada a un universo de entretenimiento y diversión.', 328973.00, '/images/1767756408445.webp', NULL, 4, '2026-01-07 03:26:48', '2026-01-07 03:26:48'),
(29, 'Microsoft Xbox Series S 512GB Kit extra controller color blanco 2020', 'LISTO PARA LA ACCIÓN\r\nLa nueva generación de videojuegos ofrece nuestra biblioteca de lanzamientos digitales más grande a la Xbox más pequeña de la historia. Con mundos más dinámicos, tiempos de carga más rápidos, la Xbox Series S totalmente digital es el mejor valor disponible en el mundo de los videojuegos.\r\n\r\nCONSÍGUELO UNA VEZ\r\nCon Smart Delivery, puedes comprar un juego compatible una vez y siempre tener la versión óptima para cualquier consola en la que juegues.\r\n\r\nSOLO DIGITAL, TODO DE NUEVA GENERACIÓN\r\nPásate a lo digital con la Xbox Series S y crea una biblioteca de juegos digitales. Tus juegos, partidas guardadas y copias de seguridad están a salvo en la nube. Además, disfruta de la capacidad de reservar y preinstalar los juegos próximos para que puedas jugarlos en el momento de su lanzamiento.\r\n\r\nVELOCIDAD REDEFINIDA\r\nXbox Velocity Architecture, impulsada por un SSD personalizado, funciona junto con la tecnología de sistema en un chip (SOC) para ofrecer una jugabilidad de hasta 120 FPS en nuestra consola más compacta.', 913093.00, '/images/1767756494801.webp', NULL, 4, '2026-01-07 03:28:14', '2026-01-07 03:28:14'),
(30, 'Consola Retro R36s Blanco', 'Introducimos la consola de juegos portátil marca Generica, una experiencia de gaming revolucionaria en tus manos.\r\n\r\nCon una pantalla IPS de 3.5 pulgadas y resolución de 640x480, sumergite en la acción con una calidad visual impresionante.\r\n\r\nEl diseño ergonómico te transporta a la experiencia arcade, con controles que se adaptan a tu mano para una jugabilidad fluida y cómoda. Y gracias a la batería de polímero de litio de 3200mAh, obtén hasta 8 horas de juego continuo sin preocupaciones.\r\n\r\nCARACTERÍSTICAS:\r\n• Apariencia Atractiva: Si\r\n• Excelente Rendimiento: Si\r\n• Multifuncional: Si\r\n• Arcade: Si\r\n• Diseño Ergonómico: Si\r\n• Versátil: Si\r\n• Portátil: Si\r\n• Pantalla: IPS de 3.5 pulgadas\r\n• Resolución: 640 * 480\r\n• Ranuras para tarjetas duales: Si\r\n• Conectividad avanzada: Si\r\n• Batería de Gran Capacidad: Si\r\n• Batería: polímero de litio de alta tensión de 3200 mAh\r\n\r\nGarantía del vendedor: 10 días', 120000.00, '/images/1767756584481.webp', NULL, 4, '2026-01-07 03:29:44', '2026-01-07 03:29:44'),
(32, 'Monitor Gamer 24 Asus Tuf Gaming Full Hd 180hz 1ms Vg249ql3a Color Negro', 'Producto: Monitor Gamer 24\" Asus Tuf Gaming Full Hd 180Hz 1Ms VG249QL3A\r\n\r\n¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯\r\nLa compatibilidad con FreeSync Premium y G-Sync ofrece una experiencia de juego fluida y sin interrupciones al habilitar VRR (frecuencia de actualización variable) de forma predeterminada.\r\nEspecificaciones técnicas:\r\n- Marca : ASUS\r\n- Modelo : TUF Gaming VG249QL3A\r\n- P/N : 90LM09G0-B011Y1\r\n- UPC : 197105747906\r\n- EAN : 4711387747902\r\n- Color : Negro\r\n- Tamaño de panel : 23.8\"\r\n- Curvo/Plano : Plano\r\n- Colores : 16.7M\r\n- Tipo de panel : IPS\r\n- Resolución : 1920 x 1080\r\n- Brillo(Max) : 350 cd/m2\r\n- Ángulo de visión : 178°/178°\r\n- Parlantes : Sí (1.2 W x 2)\r\n- Conectividad : HDMI v2.0 x 2, DisplayPort x 1, Audífonos x 1\r\n- Frecuencia de actualización : Máx. 180 Hz\r\n- Tiempo de respuesta (ms) : 1ms (GTG)\r\n- Consumo : 18W\r\n- Voltaje : 100-240V, 50/60Hz\r\n- Inclinación : Sí (+23° ~ -5°)\r\n- Giratorio : Sí (+15° ~ -15°)\r\n- Pivote : Sí (+90° ~ -90°)\r\n- Ajuste en altura : Sí (0~120mm)\r\n- VESA : 100 x 100 mm\r\n- Bloqueo Kensington : Sí\r\n- Freesync/Gsync : Sí (AMD FreeSync Premium, G-SYNC Compatible)\r\n- Dimensiones físicas con base : 54.1 x 52.5 x 20.8 cm\r\n- Dimensiones físicas sin base : 54.1 x 32.3 x 6.2 cm\r\n- Dimensiones del embalaje : 60.00 x 46.50 x 20.00 cm\r\n- Peso con base : 5.4 kg\r\n- Peso sin base : 3.4 kg\r\n- Peso del empaque : 7.5 kg', 336857.00, '/images/1767765748928.jpg', 12, 9, '2026-01-07 06:02:28', '2026-01-07 06:02:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_colors`
--

CREATE TABLE `product_colors` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_colors`
--

INSERT INTO `product_colors` (`id`, `product_id`, `color_id`) VALUES
(13, 8, 7),
(14, 8, 8),
(30, 16, 4),
(31, 17, 9),
(32, 18, 4),
(34, 20, 7),
(35, 21, 4),
(36, 22, 4),
(37, 23, 4),
(38, 24, 10),
(39, 25, 4),
(40, 26, 4),
(41, 27, 4),
(42, 28, 4),
(43, 29, 7),
(44, 30, 7),
(45, 32, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `image`, `user_category_id`, `created_at`, `updated_at`) VALUES
(1, 'Super', 'Admin', 'superadmin@admin.com', '$2b$10$xxn3m/xe/fDOtnKkfXRlCO4QSra5Ax8tSlSoW7jTr7aj0QNSirkkG', '/images/users/admin.png', 1, '2026-01-06 23:20:44', NULL),
(4, 'joaquin', 'tessari', 'joacotessari@gmail.com', '$2b$10$M1D6Pw3HQJihZTB7ZLLHQeHmPjd4V15Wb9tRX5cAUnHrw1fIcDOMq', '/images/users/1767767652177.png', 2, '2026-01-07 06:34:12', '2026-01-07 06:34:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_categories`
--

CREATE TABLE `user_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_categories`
--

INSERT INTO `user_categories` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'customer');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `color_id` (`color_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_category_id` (`user_category_id`);

--
-- Indices de la tabla `user_categories`
--
ALTER TABLE `user_categories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user_categories`
--
ALTER TABLE `user_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `product_colors`
--
ALTER TABLE `product_colors`
  ADD CONSTRAINT `product_colors_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_colors_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_category_id`) REFERENCES `user_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
