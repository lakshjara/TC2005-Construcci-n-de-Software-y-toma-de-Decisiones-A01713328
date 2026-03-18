-- phpMyAdmin SQL Dump
-- Lab 19: Role Based Access Control (RBAC)
-- A01713328 María Fernanda Padmé Lakshmi Martínez Jara

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lab17`
--

-- --------------------------------------------------------

CREATE TABLE `canciones` (
  `id` int(11) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `artista` varchar(250) NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

CREATE TABLE `albumes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `artista` varchar(250) NOT NULL,
  `anio` varchar(4) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

CREATE TABLE `privilegios` (
  `id` int(11) NOT NULL,
  `privilegio` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

CREATE TABLE `tiene` (
  `id_usuario` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

CREATE TABLE `otorga` (
  `id_rol` int(11) NOT NULL,
  `id_privilegio` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Datos de ejemplo
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'admin'),
(2, 'editor'),
(3, 'visitante');

INSERT INTO `privilegios` (`id`, `privilegio`) VALUES
(1, 'ver_canciones'),
(2, 'crear_canciones'),
(3, 'editar_canciones'),
(4, 'eliminar_canciones'),
(5, 'ver_albumes'),
(6, 'crear_albumes'),
(7, 'editar_albumes');

-- admin: todos los privilegios
INSERT INTO `otorga` (`id_rol`, `id_privilegio`) VALUES
(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7);

-- editor: ver y crear
INSERT INTO `otorga` (`id_rol`, `id_privilegio`) VALUES
(2,1),(2,2),(2,5),(2,6);

-- visitante: solo ver
INSERT INTO `otorga` (`id_rol`, `id_privilegio`) VALUES
(3,1),(3,5);

-- --------------------------------------------------------

--
-- Índices
--

ALTER TABLE `canciones`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `albumes`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `privilegios`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `tiene`
  ADD PRIMARY KEY (`id_usuario`, `id_rol`),
  ADD KEY `id_rol` (`id_rol`);

ALTER TABLE `otorga`
  ADD PRIMARY KEY (`id_rol`, `id_privilegio`),
  ADD KEY `id_privilegio` (`id_privilegio`);

--
-- AUTO_INCREMENT
--

ALTER TABLE `canciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `albumes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `privilegios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints
--

ALTER TABLE `tiene`
  ADD CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);

ALTER TABLE `otorga`
  ADD CONSTRAINT `otorga_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `otorga_ibfk_2` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;