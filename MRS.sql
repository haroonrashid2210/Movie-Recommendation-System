-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 09, 2020 at 10:01 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MRS`
--

-- --------------------------------------------------------

--
-- Table structure for table `MovieTable`
--

CREATE TABLE `MovieTable` (
  `username` varchar(200) NOT NULL,
  `movie_name` varchar(200) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `MovieTable`
--

INSERT INTO `MovieTable` (`username`, `movie_name`, `movie_id`) VALUES
('mubarak', 'AVATAR', 123);

-- --------------------------------------------------------

--
-- Table structure for table `ReviewTable`
--

CREATE TABLE `ReviewTable` (
  `username` varchar(200) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ReviewTable`
--

INSERT INTO `ReviewTable` (`username`, `movie_id`, `review`) VALUES
('harry', 27205, 'hello');

-- --------------------------------------------------------

--
-- Table structure for table `UserTable`
--

CREATE TABLE `UserTable` (
  `username` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `UserTable`
--

INSERT INTO `UserTable` (`username`, `email`, `password`) VALUES
('abdullah', 'abdullah123@gmail.com', 'abdullah'),
('ali123', 'ali123@gmail.com', 'ali'),
('haroon', 'haroon123@gmail.com', 'haroon'),
('harry', 'harry2210@gmail.com', 'harry'),
('mubarak', 'mubarak123@gmail.com', '123'),
('muizz', 'muizz123@gmail.com', 'muizz');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `MovieTable`
--
ALTER TABLE `MovieTable`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `ReviewTable`
--
ALTER TABLE `ReviewTable`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `UserTable`
--
ALTER TABLE `UserTable`
  ADD PRIMARY KEY (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
