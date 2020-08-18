-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 18 Agu 2020 pada 12.21
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `libraryapp`
--
CREATE DATABASE IF NOT EXISTS `libraryapp`;
USE `libraryapp`;
-- --------------------------------------------------------

--
-- Struktur dari tabel `authors`
--

CREATE TABLE `authors` (
  `author_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `added` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `authors`
--

INSERT INTO `authors` (`author_id`, `name`, `added`, `updated`) VALUES
(1, 'Martha Wells', '2020-06-29 16:50:31', '2020-06-29 16:50:31'),
(2, 'Brad Meltzer', '2020-06-29 16:50:31', '2020-06-29 16:50:31'),
(3, 'Catherine A. Sanderson', '2020-06-29 16:50:31', '2020-06-29 16:50:31'),
(4, 'Eric Longenhagen', '2020-06-29 16:50:31', '2020-06-29 16:50:31'),
(5, 'Kiley McDaniel', '2020-06-29 16:50:31', '2020-06-29 16:50:31'),
(6, 'Antoine de Saint-Exupéry', '2020-06-29 16:50:31', '2020-06-29 16:50:31'),
(7, 'Joanne Fluke', '2020-06-29 16:50:31', '2020-06-29 16:50:31'),
(8, 'Michael J. Sullivang', '2020-06-29 16:50:31', '2020-07-22 12:40:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `status` int(2) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `added` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `books`
--

INSERT INTO `books` (`book_id`, `title`, `description`, `image`, `author_id`, `status`, `quantity`, `genre_id`, `added`, `updated`) VALUES
(22, 'Network Effect', 'Murderbot returns in its highly-anticipated, first, full-length standalone novel.\r\n\r\nYou know that feeling when you’re at work, and you’ve had enough of people, and then the boss walks in with yet another job that needs to be done right this second or the world will end, but all you want to do is go home and binge your favorite shows? And you\'re a sentient murder machine programmed for destruction? Congratulations, you\'re Murderbot.\r\n\r\nCome for the pew-pew space battles, stay for the most relatable A.I. you’ll read this century.\r\n\r\n—\r\n\r\nI’m usually alone in my head, and that’s where 90 plus percent of my problems are.\r\n\r\nWhen Murderbot\'s human associates (not friends, never friends) are captured and another not-friend from its past requires urgent assistance, Murderbot must choose between inertia and drastic action.\r\n\r\nDrastic action it is, then.', '2020-07-20T13:36:11.353ZNetwork-Effect.jpg', 1, 0, 5, 13, '2020-06-11 06:56:40', '2020-06-18 07:58:31'),
(23, 'The Lincoln Conspiracy: The Secret Plot to Kill America\'s 16th President⁠—and Why It Failed', '\r\nThe Lincoln Conspiracy: The Secret Plot to Kill America\'s 16th President⁠—and Why It Failed\r\nRate this book\r\n1 of 5 stars\r\n2 of 5 stars\r\n3 of 5 stars\r\n4 of 5 stars\r\n5 of 5 stars\r\nThe Lincoln Conspiracy: The Secret Plot to Kill America\'s 16th President⁠—and Why It Failed\r\nby Brad Meltzer (Goodreads Author),\r\nJosh Mensch (Goodreads Author)\r\n4.39  · \r\nRating details ·  500 ratings  ·  89 reviews\r\nEveryone knows the story of Abraham Lincoln’s assassination in 1865, but few are aware of the original conspiracy to kill him four years earlier in 1861, literally on his way to Washington, DC, for his first inauguration.\r\n\r\nThe conspirators were part of a pro-Southern secret society that didn’t want an anti-slavery President in the White House. They planned an elaborate scheme to assassinate the brand new President in a Baltimore train station as Lincoln’s inauguration train passed through en route to the Capital. The plot was investigated by famed detective Allan Pinkerton, who infiltrated the group with undercover agents, including one of the first female private detectives in America. Had the assassination succeeded, there would have been no Lincoln Presidency, and the course of the Civil War and American history would have forever been altered.\r\n\r\nThe bestselling team that brought you The First Conspiracy now turns their attention to the story of the secret society that tried to kill Abraham Lincoln and the undercover detectives who foiled their plans.', '2020-07-20T13:36:40.037Zthe-lincoln-conpiracy.jpg', 2, 0, 5, 12, '2020-06-11 06:56:40', '2020-06-11 07:09:48'),
(24, 'Why We Act: Turning Bystanders into Moral Rebels', 'Why do good people so often do nothing when a seemingly small action could make a big difference? A pioneering social psychologist explains why moral courage is so rare--and reveals how it can be triggered or trained.\r\n\r\nWe are bombarded every day by reports of bad behavior, from sexual harassment to political corruption and bullying belligerence. It\'s tempting to blame evil acts on evil people, but that leaves the rest us off the hook. Silence, after all, can perpetuate cruelty. Why We Act draws on the latest developments in psychology and neuroscience to tackle an urgent question: Why do so many of us fail to intervene when we\'re needed--and what would it take to make us step up?\r\n\r\nA renowned psychologist who has done pioneering research on social norms, Catherine Sanderson was inspired to write this book when a freshman in her son\'s dorm died twenty hours after a bad fall while drinking. There were many points along the way when a decision to seek help could have saved his life. Why did no one act sooner?\r\n\r\nCutting-edge neuroscience offers part of the answer, showing how deviating from the group activates the same receptors in the brain that are triggered by pain. But Sanderson also points to many ways in which our faulty assumptions about what other people are thinking can paralyze us. And she shares surprisingly effective and simple strategies for resisting the pressure to conform. Moral courage, it turns out, is not innate. Small details and the right training can make a big difference. Inspiring and potentially life transforming, Why We Act reveals that while the urge to do nothing is deeply ingrained, even the most hesitant would-be bystander can learn to be a moral rebel.', '2020-07-20T13:36:53.528Zwhy-we-act.jpg', 3, 0, 5, 5, '2020-06-11 06:59:56', '2020-06-11 07:10:03'),
(25, 'Future Value: The Battle for Baseball\'s Soul and How Teams Will Find the Next Superstar', ' How to watch baseball and see the future\r\n\r\nFor the modern major league team, player evaluation is a complex, multi-pronged, high-tech pursuit. But far from becoming obsolete in this environment⁠—as Michael Lewis\' Moneyball once forecast⁠—the role of the scout in today\'s game has evolved and even expanded. Rather than being the antithesis of a data-driven approach, scouting now represents an essential analytical component in a team\'s arsenal.\r\n\r\nFuture Value is a thorough dive into the world of the contemporary scout—a world with its own language, methods, metrics, and madness. From rural high schools to elite amateur showcases; from the back fields of spring training to major league draft rooms, FanGraphs\' Eric Longenhagen and Kiley McDaniel break down the key systems and techniques used to assess talent. It\'s a process that has moved beyond the quintessential stopwatches and radar guns to include statistical models, countless measurable indicators, and a broader international reach.\r\n\r\nPractical and probing, discussing wide-ranging topics from tool grades to front office politics, this is an illuminating exploration of what it means to watch baseball like it\'s your job.', '2020-07-20T13:37:08.803Zfuture-value.jpg', 4, 0, 5, 6, '2020-06-11 06:59:56', '2020-06-11 07:10:19'),
(27, 'The Little Prince', 'Moral allegory and spiritual autobiography, The Little Prince is the most translated book in the French language. With a timeless charm it tells the story of a little boy who leaves the safety of his own tiny planet to travel the universe, learning the vagaries of adult behaviour through a series of extraordinary encounters. His personal odyssey culminates in a voyage to Earth and further adventures.', '2020-07-20T13:37:24.062Zthe-little-prince.jpg', 5, 0, 5, 7, '2020-06-11 07:02:31', '2020-06-11 07:10:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `genres`
--

CREATE TABLE `genres` (
  `genre_id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `added` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `genres`
--

INSERT INTO `genres` (`genre_id`, `name`, `added`, `updated`) VALUES
(4, 'biography', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(5, 'psychology', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(6, 'business', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(7, 'classics', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(8, 'comics', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(9, 'cookbooks', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(11, 'fiction', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(12, 'history', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(13, 'science', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(14, 'science fiction', '2020-06-29 16:36:40', '2020-06-29 16:36:40'),
(15, 'romance', '2020-06-29 16:36:40', '2020-07-22 12:40:45'),
(19, 'scientific', '2020-06-29 16:36:40', '2020-06-30 10:29:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `histories`
--

CREATE TABLE `histories` (
  `history_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `done` int(2) NOT NULL DEFAULT 0,
  `added` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `histories`
--

INSERT INTO `histories` (`history_id`, `book_id`, `user_id`, `done`, `added`, `updated`) VALUES
(1, 22, 12, 1, '2020-07-08 16:46:45', '2020-07-08 16:46:52'),
(3, 22, 12, 1, '2020-07-21 05:10:59', '2020-07-21 05:11:07'),
(4, 22, 12, 1, '2020-07-21 05:11:14', '2020-07-21 05:11:20'),
(5, 22, 12, 1, '2020-07-21 05:39:29', '2020-07-21 05:39:32'),
(6, 22, 12, 1, '2020-07-21 16:20:08', '2020-07-21 16:20:10'),
(7, 22, 12, 1, '2020-07-21 16:25:19', '2020-07-21 16:25:21'),
(8, 22, 12, 1, '2020-07-21 16:27:17', '2020-07-21 16:27:19'),
(9, 22, 12, 1, '2020-07-21 16:27:30', '2020-07-21 16:27:31'),
(10, 27, 12, 1, '2020-07-21 16:28:22', '2020-07-21 16:28:24'),
(11, 22, 12, 1, '2020-07-22 10:54:40', '2020-07-22 10:54:43'),
(12, 22, 12, 1, '2020-07-22 10:55:58', '2020-07-22 10:56:01'),
(13, 22, 12, 1, '2020-07-22 11:48:52', '2020-07-22 11:48:55'),
(17, 22, 12, 1, '2020-08-05 16:52:50', '2020-08-18 01:51:25'),
(18, 23, 12, 1, '2020-08-05 16:59:12', '2020-08-05 16:59:14'),
(19, 23, 12, 1, '2020-08-05 16:59:23', '2020-08-05 16:59:26'),
(20, 24, 12, 1, '2020-08-05 16:59:30', '2020-08-05 16:59:32'),
(21, 23, 12, 1, '2020-08-18 01:45:47', '2020-08-18 01:50:58'),
(22, 23, 12, 1, '2020-08-18 01:51:03', '2020-08-18 01:51:05'),
(23, 23, 12, 1, '2020-08-18 02:38:43', '2020-08-18 02:38:46'),
(24, 23, 12, 1, '2020-08-18 02:55:27', '2020-08-18 03:26:07'),
(25, 22, 12, 1, '2020-08-18 03:27:16', '2020-08-18 03:27:24'),
(26, 23, 12, 1, '2020-08-18 08:36:07', '2020-08-18 08:36:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `added` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `username`, `full_name`, `password`, `email`, `role`, `image`, `added`, `updated`) VALUES
(12, 'admin', 'Admin tampan', '$2b$10$efI9Cqrn8UNSFyy9NhG34OjN/CnC.04D.9nyPesUEqh8OibTvs5PS', 'admin@libraryapp.com', 1, '2020-07-20T17:57:02.640ZIMG_20200720_162335.jpg', '2020-06-14 06:52:04', '2020-06-14 06:52:04'),
(13, 'staff', 'staff manager', '$2b$10$i2V0nj672FMa5fpyoKOZx.vl96kmJ33nfZBboclkdE4XJHH8/Q.c.', 'staff@libraryapp.com', 2, '2020-07-20T17:59:02.233Zprofile.jpg', '2020-06-14 14:32:29', '2020-06-14 14:32:29');

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `v_book_and_genre`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `v_book_and_genre` (
`book_id` int(11)
,`title` varchar(100)
,`description` text
,`image` varchar(200)
,`author_id` int(11)
,`status` int(2)
,`quantity` int(11)
,`genre_id` int(11)
,`added` timestamp
,`updated` timestamp
,`genre_name` varchar(200)
,`author_name` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `v_histories`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `v_histories` (
`history_id` int(11)
,`book_id` int(11)
,`user_id` int(11)
,`done` int(2)
,`updated` timestamp
,`title` varchar(100)
,`username` varchar(255)
);

-- --------------------------------------------------------

--
-- Struktur untuk view `v_book_and_genre`
--
DROP TABLE IF EXISTS `v_book_and_genre`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_book_and_genre`  AS  select `books`.`book_id` AS `book_id`,`books`.`title` AS `title`,`books`.`description` AS `description`,`books`.`image` AS `image`,`books`.`author_id` AS `author_id`,`books`.`status` AS `status`,`books`.`quantity` AS `quantity`,`books`.`genre_id` AS `genre_id`,`books`.`added` AS `added`,`books`.`updated` AS `updated`,`genres`.`name` AS `genre_name`,`authors`.`name` AS `author_name` from ((`books` join `genres`) join `authors`) where `books`.`genre_id` = `genres`.`genre_id` and `books`.`author_id` = `authors`.`author_id` ;

-- --------------------------------------------------------

--
-- Struktur untuk view `v_histories`
--
DROP TABLE IF EXISTS `v_histories`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_histories`  AS  select `histories`.`history_id` AS `history_id`,`histories`.`book_id` AS `book_id`,`histories`.`user_id` AS `user_id`,`histories`.`done` AS `done`,`histories`.`updated` AS `updated`,`books`.`title` AS `title`,`users`.`username` AS `username` from ((`histories` join `books`) join `users`) where `histories`.`book_id` = `books`.`book_id` and `histories`.`user_id` = `users`.`user_id` ;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`author_id`);

--
-- Indeks untuk tabel `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `genre_id` (`genre_id`) USING BTREE;

--
-- Indeks untuk tabel `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indeks untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `authors`
--
ALTER TABLE `authors`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT untuk tabel `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT untuk tabel `genres`
--
ALTER TABLE `genres`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `histories`
--
ALTER TABLE `histories`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors` (`author_id`);

--
-- Ketidakleluasaan untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
