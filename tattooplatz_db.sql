-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2026 at 07:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tattooplatz_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `station_id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `start_hour` int(11) NOT NULL,
  `end_hour` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('Confirmed','Cancelled','Blocked') DEFAULT 'Confirmed',
  `location` varchar(50) DEFAULT 'Zurich',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `station_id`, `booking_date`, `start_hour`, `end_hour`, `total_price`, `status`, `location`, `created_at`) VALUES
(32, 1, 1, '2026-07-04', 11, 17, 180.00, 'Confirmed', 'Zurich', '2026-07-03 06:00:30'),
(33, 1, 1, '2026-07-05', 13, 17, 120.00, 'Confirmed', 'Zurich', '2026-07-03 06:01:23'),
(34, NULL, 1, '2026-07-06', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:26:16'),
(35, NULL, 2, '2026-07-06', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:26:16'),
(36, NULL, 3, '2026-07-06', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:26:16'),
(37, NULL, 4, '2026-07-06', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:26:16'),
(38, NULL, 1, '2026-07-08', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:27:50'),
(39, NULL, 2, '2026-07-08', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:27:50'),
(40, NULL, 3, '2026-07-08', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:27:50'),
(41, NULL, 4, '2026-07-08', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:27:50'),
(42, NULL, 1, '2026-07-09', 10, 11, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:29:36'),
(43, NULL, 1, '2026-07-10', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:46:55'),
(44, NULL, 3, '2026-07-10', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:46:55'),
(45, NULL, 4, '2026-07-10', 10, 18, 0.00, 'Blocked', 'Zurich', '2026-07-03 06:46:55');

-- --------------------------------------------------------

--
-- Table structure for table `compliance_docs`
--

CREATE TABLE `compliance_docs` (
  `id` int(11) NOT NULL,
  `doc_type` varchar(100) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_url` text NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Approved',
  `uploaded_by_admin_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `submitted_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquiries`
--

INSERT INTO `inquiries` (`id`, `name`, `email`, `message`, `submitted_date`, `created_at`) VALUES
(4, 'Mailing List Subscriber', 'sarah123@gmail.com', 'Joined Mailing List', '2026-07-03', '2026-07-03 06:59:10'),
(5, 'Newsletter Subscriber', 'siyaahh@gmail.com', 'Subscribed to dark banner newsletter', '2026-07-03', '2026-07-03 06:59:39'),
(6, 'svana', 'svana@gmail.com', 'hello this only for ....', '2026-07-03', '2026-07-03 07:00:13');

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `id` int(11) NOT NULL,
  `station_number` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `location` varchar(50) DEFAULT 'Zurich',
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`id`, `station_number`, `name`, `location`, `is_active`) VALUES
(1, 1, 'Station 1', 'Zurich', 1),
(2, 2, 'Station 2', 'Zurich', 1),
(3, 3, 'Station 3', 'Zurich', 1),
(4, 4, 'Station 4', 'Zurich', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('artist','admin') NOT NULL DEFAULT 'artist',
  `phone` varchar(30) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `status` enum('Active','Blocked') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `phone`, `instagram`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Chris (Studio Manager)', 'chris@tattooplatz.ch', '$2a$10$I4zr8OJqB7J9SAJYIx6U4ebcAXoUlqaYudGhpKVq/Eylk.sCDK.ee', 'admin', '+41 44 123 45 67', '@tattooplatz_zurich', 'Active', '2026-06-29 09:32:59', '2026-06-29 13:10:06'),
(2, 'Joao Otereze', 'artist@tattooplatz.ch', '$2a$10$QQqg5ucODMlY.zjQ5cMpKelKCmFn5GPJcnNwknUUbSudy8QXA0FHq', 'artist', '+41 79 123 45 67', '@artist_instagram', 'Active', '2026-06-29 13:03:41', '2026-06-29 13:03:41'),
(7, 'Marco V.', 'marco.v@gmail.com', '$2a$10$4kzSyB7uX.4iDqztuu86VO/sHx9hDd8uZ.OXmcHMYJwcvnE/7iScS', 'artist', '+41 78 234 56 78', '@marco_tats', 'Active', '2026-07-03 05:39:57', '2026-07-03 05:39:57'),
(8, 'Alina R.', 'alina.r@gmail.com', '$2a$10$ioXX5oFpc/MlgvZA6u3a2uLVV5Wd4dhgybTZ9ZGDaCjV0pzmzqcYa', 'artist', '+41 77 345 67 89', '@alina_ink', 'Active', '2026-07-03 05:39:57', '2026-07-03 05:39:57'),
(9, 'Jonas K.', 'jonas.k@tattooplatz.ch', '$2a$10$ly/mmJAE6cm3KGA/vxuaAOB2SyuaXtHmPifF3cyvfg5qwEr/IkW6W', 'artist', '+41 76 456 78 90', '@jonas_tattoos', 'Active', '2026-07-03 05:39:57', '2026-07-03 05:39:57'),
(10, 'Sofia M.', 'sofia.m@gmail.com', '$2a$10$luu7T3ddxacNUJ2O8Xllaur2dJWNKLhUxFm7IdppOIOIyj11Zs8wa', 'artist', '+41 75 567 89 01', '@sofia_tattoos', 'Active', '2026-07-03 05:39:58', '2026-07-03 05:39:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `station_id` (`station_id`),
  ADD KEY `idx_booking_slot` (`booking_date`,`station_id`,`status`);

--
-- Indexes for table `compliance_docs`
--
ALTER TABLE `compliance_docs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploaded_by_admin_id` (`uploaded_by_admin_id`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stations`
--
ALTER TABLE `stations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `station_number` (`station_number`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `compliance_docs`
--
ALTER TABLE `compliance_docs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stations`
--
ALTER TABLE `stations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`station_id`) REFERENCES `stations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `compliance_docs`
--
ALTER TABLE `compliance_docs`
  ADD CONSTRAINT `compliance_docs_ibfk_1` FOREIGN KEY (`uploaded_by_admin_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
