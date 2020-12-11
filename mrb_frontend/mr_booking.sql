-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 11, 2020 at 02:58 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mr_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `ruang`
--

DROP TABLE IF EXISTS `ruang`;
CREATE TABLE IF NOT EXISTS `ruang` (
  `id_ruang` int(2) NOT NULL AUTO_INCREMENT,
  `nm_ruang` varchar(30) NOT NULL,
  `kapasitas` int(3) NOT NULL,
  `fasilitas` varchar(50) NOT NULL,
  `desc_ruang` varchar(50) NOT NULL,
  PRIMARY KEY (`id_ruang`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ruang`
--

INSERT INTO `ruang` (`id_ruang`, `nm_ruang`, `kapasitas`, `fasilitas`, `desc_ruang`) VALUES
(1, 'SGM Explor', 80, 'LCD, AC, wifi, meja, kursi', '45 besar'),
(2, 'Bebelac', 7, 'LCD, AC, wifi, meja, kursi', '45 kecil'),
(3, 'Lactamil', 10, 'Tandberg, AC, wifi, meja, kursi', '4'),
(4, 'Nutrilon Royal', 12, 'projector, AC, wifi, meja, kursi', 'QFS'),
(5, 'SGM Ananda', 20, 'projector, AC, wifi, meja, kursi', 'Social Block'),
(6, 'SGM Soya', 5, 'projector, AC, wifi, meja, kursi', 'Delta'),
(7, 'SGM Bunda', 10, 'projector, AC, wifi, meja, kursi', '1'),
(8, 'LLM', 7, 'projector, AC, wifi, meja, kursi', '2'),
(9, 'RWS', 20, 'projector, AC, wifi, lesehan', 'Library'),
(10, 'Themis', 30, 'projector, AC, wifi, meja, kursi', 'Lantai 3');

-- --------------------------------------------------------

--
-- Table structure for table `snack`
--

DROP TABLE IF EXISTS `snack`;
CREATE TABLE IF NOT EXISTS `snack` (
  `id_snack` int(1) NOT NULL AUTO_INCREMENT,
  `nm_snack` varchar(20) NOT NULL,
  `desc_snack` varchar(50) NOT NULL,
  PRIMARY KEY (`id_snack`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `snack`
--

INSERT INTO `snack` (`id_snack`, `nm_snack`, `desc_snack`) VALUES
(1, 'Snack Berat', 'Makanan berat'),
(2, 'Snack Ringan', 'Kletikan'),
(3, 'Luch Box', 'Makan siang'),
(4, 'Buah', 'Buah-buahan'),
(5, 'Minuman', 'Jus, Minuman tradisional');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

DROP TABLE IF EXISTS `transaksi`;
CREATE TABLE IF NOT EXISTS `transaksi` (
  `id_transaksi` int(4) NOT NULL AUTO_INCREMENT,
  `tgl` date NOT NULL,
  `id_ruang` int(2) NOT NULL,
  `id_user` int(2) NOT NULL,
  `activity` varchar(20) NOT NULL,
  `id_snack` int(1) NOT NULL,
  `additional` varchar(30) NOT NULL,
  PRIMARY KEY (`id_transaksi`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `tgl`, `id_ruang`, `id_user`, `activity`, `id_snack`, `additional`) VALUES
(1, '2020-11-02', 1, 1, 'Audit FSI', 1, 'Audit'),
(2, '2020-11-09', 2, 1, 'Audit Dango', 1, 'Audit'),
(5, '2020-11-30', 7, 2, 'Megacon 2020', 1, 'Megacon 2020'),
(3, '2020-11-04', 10, 2, 'Internal Meeting', 5, 'Meeting'),
(6, '2020-11-30', 9, 2, 'Testing', 4, 'Ruangan aja');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(2) NOT NULL AUTO_INCREMENT,
  `user` varchar(8) NOT NULL,
  `password` varchar(32) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `display_nm` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cost_center` int(7) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `user`, `password`, `is_admin`, `display_nm`, `email`, `cost_center`) VALUES
(1, 'admin', 'b84283c429dbb027928992faa82bbd9e', 1, 'Admin', 'admin@mail.com', 1234567),
(2, 'user', '9a897af96f2d904880d654d3fae3b2ac', 0, 'User', 'user@mail.com', 7654321),
(3, 'root', '8be35e785684bd9dd8bf25ca912ca092', 1, 'Root', 'root@mail.com', 1234567);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
