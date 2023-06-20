PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS `film` (
  `id` INTEGER PRIMARY KEY NOT NULL,
  `imdb_id` INTEGER NULL,
  `za_odrasle` TINYINT NOT NULL,
  `bd_putanje` TEXT NULL,
  `pripada_kolekciji` TINYINT NULL,
  `budzet` INTEGER NOT NULL,
  `pocetna_stranica` TEXT NULL,
  `originalni_jezik` VARCHAR(45) NOT NULL,
  `originalni_naslov` VARCHAR(128) NOT NULL,
  `pregled` TEXT NULL,
  `popularnost` FLOAT NOT NULL,
  `poster_putanje` TEXT NULL,
  `datum_izlaska` DATE NOT NULL,
  `prihod` INTEGER NOT NULL,
  `trajanje` INTEGER NULL,
  `status` VARCHAR(45) NOT NULL,
  `slogan` TEXT NULL,
  `naslov` TEXT NOT NULL,
  `video` TINYINT NOT NULL,
  `prosjek_glasova` FLOAT NOT NULL,
  `broj_glasova` INTEGER NOT NULL,
  `datum_unosa` DATETIME NULL,
  `prijedlog` TINYINT NULL);

CREATE TABLE IF NOT EXISTS `zanr` (
  `id` INTEGER PRIMARY KEY NOT NULL,
  `naziv` VARCHAR(50) NOT NULL);

CREATE TABLE IF NOT EXISTS `film_ima_zanr` (
  `film_id` INTEGER NOT NULL,
  `zanr_id` INTEGER NOT NULL,
  FOREIGN KEY (film_id) REFERENCES film(id),
  FOREIGN KEY (zanr_id) REFERENCES zanr(id),
  PRIMARY KEY (film_id, zanr_id));
  -- INDEX `fk_film_has_zanr_zanr1_idx` (`zanr_id` ASC),
  -- INDEX `fk_film_has_zanr_film_idx` (`film_id` ASC),
  -- -- CONSTRAINT `fk_film_has_zanr_film`
  --   FOREIGN KEY film_id
  --   REFERENCES film(id)
  --   ON DELETE NO ACTION
  --   ON UPDATE NO ACTION,
  -- -- CONSTRAINT `fk_film_has_zanr_zanr1`
  --   FOREIGN KEY zanr_id
  --   REFERENCES zanr(id)
  --   ON DELETE NO ACTION
  --   ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `tip_korisnika` (
  `id` INTEGER PRIMARY KEY NOT NULL,
  `naziv` VARCHAR(45) NOT NULL,
  `opis` TEXT NULL,
  UNIQUE (`naziv`));

CREATE TABLE IF NOT EXISTS `korisnik` (
  `id` INTEGER PRIMARY KEY NOT NULL,
  `ime` VARCHAR(50) NULL,
  `prezime` VARCHAR(100) NULL,
  `adresa` TEXT NULL,
  `korime` VARCHAR(50) NOT NULL,
  `lozinka` TEXT NULL,
  `email` VARCHAR(50) NOT NULL,
  `blokiran` TINYINT NULL,
  `tip_korisnika_id` INTEGER NOT NULL,
  FOREIGN KEY (tip_korisnika_id) REFERENCES tip_korisnika(id),
  UNIQUE (`korime`),
  UNIQUE (`email`));

CREATE TABLE IF NOT EXISTS `korisnik_has_film` (
  `korisnik_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id),
  FOREIGN KEY (film_id) REFERENCES film(id),
  PRIMARY KEY (korisnik_id, film_id));
  -- INDEX `fk_korisnik_has_film_film1_idx` (`film_id` ASC),
  -- INDEX `fk_korisnik_has_film_korisnik1_idx` (`korisnik_id` ASC),
  -- CONSTRAINT `fk_korisnik_has_film_korisnik1`
  -- CONSTRAINT `fk_korisnik_has_film_film1`

CREATE TABLE IF NOT EXISTS `slika` (
  `korisnik_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  `url` TEXT NULL,
  `naziv` VARCHAR(45) NULL,
  `opis` VARCHAR(200) NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id),
  FOREIGN KEY (film_id) REFERENCES film(id),
  PRIMARY KEY (korisnik_id, film_id));
  -- INDEX `fk_korisnik_has_film1_film1_idx` (`film_id` ASC),
  -- INDEX `fk_korisnik_has_film1_korisnik1_idx` (`korisnik_id` ASC),
  -- CONSTRAINT `fk_korisnik_has_film1_korisnik1`
  -- CONSTRAINT `fk_korisnik_has_film1_film1`

INSERT INTO `tip_korisnika` (`id`, `naziv`, `opis`) VALUES
(0, 'registrirani korisnik', 'Registrirani je korisnik u sustavu, bez posebnih uloga.'),
(1, 'admin', 'Administrator sustava, može raditi sve što druge uloge mogu i više.');

INSERT INTO `korisnik` (`id`, `ime`, `prezime`, `adresa`, `korime`, `lozinka`, `email`, `blokiran`, `tip_korisnika_id`) VALUES
(1, 'obicni', 'korisnik', 'SQL Baza Podataka, 2022 RWA, Republika Hrvatska', 'obican', '906a472189a22ab504c0ab208135954cd5e2873d76ef5b1d3873b60b1ff06cdd', 'obican.korisnik@zadaca01.hr', 0, 0),
(2, 'administrator', 'sustava', 'SQL Baza Podataka, 2022 RWA, Republika Hrvatska', 'admin', '9bf8be4d1bdf4f31acca2c7fc3172cc57e0a49e25110ef21be0df6fe859ce112', 'administrator.sustava@zadaca01.hr', 0, 1),
(3, 'ime_osobe', 'prezime_osobe', 'adresa_osobe', 'imeprezime_osobe5', 'lozinka_osobe', 'email_osobe5', 0, 0),
(4, 'Ti', 'Codiz', 'Code boulevarde, London, United Kingdom', 'ticodi', '2792c3943b492423521c825ed5b907ba6d5ec1159bc56035bbd5ede31d4d7f41', 'ticodi8883@haikido.com', 0, 0),
(5, 'Vee', 'Babo', 'Code boulevarde 8, London, United Kingdom', 'vebab', '80b7a186528a4d9db4098a762a6657eca284e54cf28c970101e88573cae8ec05', 'vebab42926@chnlog.com', 0, 0);

INSERT INTO `film` (`id`, `imdb_id`, `za_odrasle`, `bd_putanje`, `pripada_kolekciji`, `budzet`, `pocetna_stranica`, `originalni_jezik`, `originalni_naslov`, `pregled`, `popularnost`, `poster_putanje`, `datum_izlaska`, `prihod`, `trajanje`, `status`, `slogan`, `naslov`, `video`, `prosjek_glasova`, `broj_glasova`, `datum_unosa`, `prijedlog`) VALUES
(5, NULL, 1, '/c1BaOxC8bo5ACFYkYYxL0bBWRaq.jpg', NULL, 4000000, NULL, 'en', 'Four Rooms', 'Its Ted the Bellhops first night on the job...and the hotels very unusual guests are about to place him in some outrageous predicaments. It seems that this evenings room service is serving up one unbelievable happening after another.', 12.708, '/75aHn1NOYXh4M7L5shoeQ6NGykP.jpg', '1995-12-09', 4257354, 98, 'Released', 'Twelve outrageous guests. Four scandalous requests. And one lone bellhop, in his first day on the job, whos in for the wildest New years Eve of his life.', 'Four Rooms', 0, 5.696, 2246, '2022-11-10 22:06:26', 1),
(15, NULL, 1, '/3Ne0EpyuhZkIbfSyDzzMaNkb7Z7.jpg', NULL, 839727, NULL, 'en', 'Citizen Kane LMAO', 'Newspaper magnate, Charles Foster Kane is taken from his mother as a boy and made the ward of a rich industrialist. As a result, every well-meaning, tyrannical or self-destructive move he makes for the rest of his life appears in some way to be a reaction to that deeply wounding event.', 22.731, '/sav0jxhqiH0bPr2vZFU0Kjt2nZL.jpg', '1941-04-01', 23218000, 119, 'Released', 'Its terrific!', 'Citizen Kane', 0, 8, 4608, '2022-11-10 21:58:57', 1),
(18, NULL, 0, '/dwN0kPGrLbFRxyL3F3J3t4ShQx.jpg', NULL, 90000000, NULL, 'en', 'The Fifth Element', 'In 2257, a taxi driver is unintentionally given the task of saving a young girl who is part of the key that will ensure the survival of humanity.', 45.112, '/fPtlCO1yQtnoLHOwKtWz7db6RGU.jpg', '1997-05-02', 263920180, 126, 'Released', 'There is no future without it.', 'The Fifth Element', 0, 7.5, 9257, '2022-11-10 22:06:00', 0),
(66, NULL, 0, '/n7U0FEirHej1yQIy2mAzDtF9wBz.jpg', NULL, 50000000, NULL, 'en', 'Absolute Power', 'A master thief coincidentally is robbing a house where a murder—in which the President of The United States is involved—occurs in front of his eyes. He is forced to run, while holding evidence that could convict the President.', 32.866, '/xX9gmwtnTi0Y8WcTF7Jsg9Hdp6W.jpg', '1997-02-14', 50068310, 121, 'Released', 'Corrupts Absolutely.', 'Absolute Power', 0, 6.63, 883, '2023-01-04 15:44:27', 1),
(100, NULL, 0, '/cXQH2u7wUIX1eoIdEj51kHXoWhX.jpg', NULL, 1350000, NULL, 'en', 'Lock, Stock and Two Smoking Barrels', 'A card shark and his unwillingly-enlisted friends need to make a lot of cash quick after losing a sketchy poker match. To do this they decide to pull a heist on a small-time gang who happen to be operating out of the flat next door.', 11.718, '/8kSerJrhrJWKLk1LViesGcnrUPE.jpg', '1998-08-28', 28356188, 105, 'Released', 'A Disgrace to Criminals Everywhere.', 'Lock, Stock and Two Smoking Barrels', 0, 8.145, 5688, '2022-12-02 02:04:58', 0),
(105, NULL, 0, '/5bzPWQ2dFUl2aZKkp7ILJVVkRed.jpg', NULL, 19000000, NULL, 'en', 'Back to the Future', 'Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadvertently disrupting his parents first meeting and attracting his mothers romantic interest. Marty must repair the damage to history by rekindling his parents romance and - with the help of his eccentric inventor friend Doc Brown - return to 1985.', 52.857, '/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg', '1985-07-03', 381109762, 116, 'Released', 'Hes the only kid ever to get into trouble before he was born.', 'Back to the Future', 0, 8.307, 17209, '2022-12-02 02:05:16', 0),
(110, NULL, 0, '/A9IY3j3Hwf4Q8Q9w5QxSQPYSvCu.jpg', NULL, 0, NULL, 'fr', 'Trois couleurs : Rouge', 'Valentine, a student model in Geneva, struggles with a possessive boyfriend and a troubled family. When she runs over a dog, she discovers that its owner, a retired judge, is illegally wiretapping and eavesdropping on his neighbors phone calls. Although Valentine is outraged, she develops a strange bond with the judge – and as the two become closer, she finds herself caught in the middle of events that could change her life.', 17.858, '/JHmsBiX1tjCKqAul1lzC20WcAW.jpg', '1994-05-12', 0, 100, 'Released', '', 'Three Colors: Red', 0, 8, 1093, '2022-12-02 02:05:11', 0),
(125, NULL, 0, NULL, NULL, 0, NULL, 'pl', 'Dworzec', 'Kieslowski’s later film Dworzec (Station, 1980) portrays the atmosphere at Central Station in Warsaw after the rush hour.', 1.747, '/c4xG9QoCx2zXc8iP3jQVLYDHiMi.jpg', '1980-01-01', 0, 13, 'Released', '', 'Railway Station', 0, 5.882, 17, '2022-12-30 15:38:29', 0),
(126, NULL, 0, '/59PVw1vVgLZVVJZfV6k1SfOvcYZ.jpg', NULL, 0, NULL, 'pl', 'Krótki dzień pracy', 'A dramatisation of the workers protests in June 1976 in Radom, seen from the perspective of the local Secretary of the Polish United Workers Party. [Produced in 1981, but not commercially released until 1996.]', 0.908, '/rJwiDSoKI3ryiLTZZ6BPUl2CrwG.jpg', '1981-01-01', 0, 73, 'Released', '', 'Short Working Day', 0, 6.8, 5, '2022-12-30 15:40:52', 0),
(127, NULL, 0, '/eTSRN1Bwce60rpAORwkKbPRDT6V.jpg', NULL, 0, NULL, 'pl', 'Przypadek', 'Witek runs after a train. Three variations follow on how such a seemingly banal incident could influence the rest of Witeks life.', 8.358, '/gx84VmJllqvXF3JEqcEdsxBEcbF.jpg', '1987-01-10', 0, 123, 'Released', '', 'Blind Chance', 0, 7.564, 149, '2022-12-30 15:41:21', 1),
(128, NULL, 0, '/mpNd0rTVrp6vHJ9Je7wSa3zC8JS.jpg', NULL, 26500000, NULL, 'ja', 'もののけ姫', 'Ashitaka, a prince of the disappearing Emishi people, is cursed by a demonized boar god and must journey to the west to find a cure. Along the way, he encounters San, a young human woman fighting to protect the forest, and Lady Eboshi, who is trying to destroy it. Ashitaka must find a way to bring balance to this conflict.', 54.817, '/cMYCDADoLKLbB83g4WnJegaZimC.jpg', '1997-07-12', 159414369, 134, 'Released', 'The Fate Of The World Rests On The Courage Of One Warrior.', 'Princess Mononoke', 0, 8.344, 6710, '2022-12-30 15:47:57', 0),
(129, NULL, 0, '/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg', NULL, 19000000, NULL, 'ja', '千と千尋の神隠し', 'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.', 97.866, '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', '2001-07-20', 274925095, 125, 'Released', '', 'Spirited Away', 0, 8.54, 13720, '2022-12-30 15:50:46', 0),
(150, NULL, 0, '/ga7IxkBBMopo7z6akBPvogj4EQI.jpg', NULL, 12000000, NULL, 'en', '48 Hrs.', 'A hard-nosed cop reluctantly teams up with a wise-cracking criminal temporarily paroled to him, in order to track down a killer.', 12.641, '/phNxblI8gWJxATAGd5G4Nts7GcL.jpg', '1982-12-07', 78868508, 96, 'Released', 'One Cop. One Con. No Mercy.', '48 Hrs.', 0, 6.663, 1190, '2022-11-10 21:18:35', 1),
(200, NULL, 0, '/goNk0VDnUjxKjB6o69kYS5vvZo2.jpg', NULL, 70000000, NULL, 'en', 'Star Trek: Insurrection', 'When an alien race and factions within Starfleet attempt to take over a planet that has \"regenerative\" properties, it falls upon Captain Picard and the crew of the Enterprise to defend the planets people as well as the very ideals upon which the Federation itself was founded.', 16.807, '/xQCMAHeg5M9HpDIqanYbWdr4brB.jpg', '1998-12-11', 118000000, 103, 'Released', 'The battle for paradise has begun.', 'Star Trek: Insurrection', 0, 6.43, 971, '2022-12-02 02:05:21', 0),
(201, NULL, 0, '/6z9w8eidKWDDXwZNSVNaRolAYEP.jpg', NULL, 60000000, NULL, 'en', 'Star Trek: Nemesis', 'En route to the honeymoon of William Riker to Deanna Troi on her home planet of Betazed, Captain Jean-Luc Picard and the crew of the U.S.S. Enterprise receives word from Starfleet that a coup has resulted in the installation of a new Romulan political leader, Shinzon, who claims to seek peace with the human-backed United Federation of Planets. Once in enemy territory, the captain and his crew make a startling discovery: Shinzon is human, a slave from the Romulan sister planet of Remus, and has a secret, shocking relationship to Picard himself.', 21.531, '/tL1EdpfqX6vqPCnhyOh81Nf4ndV.jpg', '2002-12-13', 67312826, 117, 'Released', 'A generations final journey... begins.', 'Star Trek: Nemesis', 0, 6.29, 1164, '2022-12-02 02:05:24', 0),
(203, NULL, 0, '/WiiLlUc2FYa0kTmGwFoL6vw0gv.jpg', NULL, 500000, NULL, 'en', 'Mean Streets', 'A small-time hood must choose from among love, friendship and the chance to rise within the mob.', 11.925, '/2t6RrPFGJjeKvI02OhKAg75bQUI.jpg', '1973-10-14', 3000000, 112, 'Released', 'You dont make up for your sins in church. You do it in the streets...', 'Mean Streets', 0, 7.116, 1729, '2022-12-02 02:05:29', 1),
(204, NULL, 0, '/sdNPipjZoOJFuTBwH8EyEb5dsKv.jpg', NULL, 0, NULL, 'fr', 'Le Salaire de la peur', 'In the South American jungle, supplies of nitroglycerine are needed at a remote oil field. The oil company pays four men to deliver the supplies in two trucks. A tense rivalry develops between the two sets of drivers on the rough remote roads where the slightest jolt can result in death.', 12.491, '/dZyZSosIlWcpQkV0f7pXcrV2TQV.jpg', '1953-04-22', 0, 153, 'Released', 'Dynamic Tremendous Shattering', 'The Wages of Fear', 0, 8.034, 695, '2022-12-02 02:05:32', 1),
(205, NULL, 0, '/ljEdpkceJ9b3TEcTVQISS0Goft0.jpg', NULL, 17500000, NULL, 'en', 'Hotel Rwanda', 'Inspired by true events, this film takes place in Rwanda in the 1990s when more than a million Tutsis were killed in a genocide that went mostly unnoticed by the rest of the world. Hotel owner Paul Rusesabagina houses over a thousand refuges in his hotel in attempt to save their lives.', 23.598, '/p3pHw85UMZPegfMZBA6dZ06yarm.jpg', '2004-03-04', 38000000, 121, 'Released', 'When the world closed its eyes, he opened his arms.', 'Hotel Rwanda', 0, 7.71, 2411, '2022-12-02 02:05:35', 0),
(600, NULL, 0, '/yozBWKbyeXtPGN75PlHurOaVvEz.jpg', NULL, 30000000, NULL, 'en', 'Full Metal Jacket', 'A pragmatic U.S. Marine observes the dehumanizing effects the U.S.-Vietnam War has on his fellow recruits from their brutal boot camp training to the bloody street fighting in Hue.', 40.107, '/kMKyx1k8hWWscYFnPbnxxN4Eqo4.jpg', '1987-06-26', 46357676, 117, 'Released', 'Vietnam can kill me, but it can’t make me care.', 'Full Metal Jacket', 0, 8.144, 9022, '2022-12-27 19:58:15', 1),
(601, NULL, 0, '/mXLVA0YL6tcXi6SJSuAh9ONXFj5.jpg', NULL, 10500000, NULL, 'en', 'E.T. the Extra-Terrestrial', 'After a gentle alien becomes stranded on Earth, the being is discovered and befriended by a young boy named Elliott. Bringing the extraterrestrial into his suburban California house, Elliott introduces E.T., as the alien is dubbed, to his brother and his little sister, Gertie, and the children decide to keep its existence a secret. Soon, however, E.T. falls ill, resulting in government intervention and a dire situation for both Elliott and the alien.', 49.998, '/uzMlN4rtkNewJ5UDNut8yhUxNxa.jpg', '1982-06-11', 792965500, 115, 'Released', 'He is afraid. He is alone. He is three million light years from home.', 'E.T. the Extra-Terrestrial', 0, 7.508, 9894, '2022-12-27 19:59:05', 0),
(1050, NULL, 0, '/ipGtZEwR99uFyJPykTrjYLxPAik.jpg', NULL, 0, NULL, 'zh', '洗澡', 'An aged father and his younger, mentally challenged son have been working hard every day to keep the bathhouse running for a motley group of regular customers. When his elder son, who left years ago to seek his fortune in the southern city of Shenzhen, abruptly returns one day, it once again puts under stress the long-broken father-son ties. Presented as a light-hearted comedy, Shower explores the value of family, friendship, and tradition.', 4.954, '/wAEmh0m4RSDQrby64REzZJLCSH5.jpg', '1999-09-13', 0, 92, 'Released', '', 'Shower', 0, 7, 52, '2022-12-02 02:05:18', 1),
(2001, NULL, 0, '/syO4HCR4t3tz6TX9CbYlW9fTQX3.jpg', NULL, 21000000, NULL, 'en', 'We Own the Night', 'A New York nightclub manager tries to save his brother and father from Russian mafia hitmen.', 11.715, '/rsKhSr3UNjG2DhVj2KPj0ARujez.jpg', '2007-10-09', 55033767, 118, 'Released', 'Two brothers on opposite sides of the law. Beyond their differences lies loyalty.', 'We Own the Night', 0, 6.7, 1131, '2022-12-02 02:06:16', 1),
(2002, NULL, 0, '/8rl2FnibCaAgn8LlkljVBayLwbU.jpg', NULL, 6000000, NULL, 'fr', 'Une vieille maîtresse', 'Secrets, rumors and betrayals surround the upcoming marriage between a young dissolute man and virtuous woman of the French aristocracy.', 5.213, '/mlwZeO5eddSHTeoRbH5htWT3ZQU.jpg', '2007-05-30', 1831577, 114, 'Released', '', 'The Last Mistress', 0, 5.9, 42, '2022-12-02 02:06:18', 1),
(2004, NULL, 0, '/s2XyJwZ2nmtbCT8ZE3oPlm0yq1j.jpg', NULL, 0, NULL, 'de', 'Kebab Connection', 'In Hamburg, Ibrahim \"Ibo\" Secmez, of Turkish descent, wants to direct the first German kung-fu movie. For now, he makes commercials for his uncles kebab restaurant. Titzie, an aspiring actress and Ibos German girlfriend, finds shes pregnant. Ibo is uncertain about fatherhood - compounded by his fathers disowning him for getting a German girl pregnant - so Titzie sends him packing. He makes attempts at getting it right, but as the birth approaches, hes still not ready. In the background are three thugs in search of good tripe soup and a Capulet-Montegue feud between the kebab joint and a Greek taverna across the street. Can Ibo be the glove upon that hand?', 3.059, '/8pgbRb69LxSaQi0BqVVjNMHIErE.jpg', '2004-04-21', 0, 96, 'Released', '', 'Kebab Connection', 0, 6.547, 53, '2022-12-02 02:06:23', 1),
(2005, NULL, 0, '/8gn0V6R8V513vT3tOsP2IfrkzEu.jpg', NULL, 31000000, NULL, 'en', 'Sister Act', 'A Reno singer witnesses a mob murder and the cops stash her in a nunnery to protect her from the mobs hitmen. The mother superior does not trust her, and takes steps to limit her influence on the other nuns. Eventually the singer rescues the failing choir and begins helping with community projects, which gets her an interview on TV—and identification by the mob.', 18.92, '/xZvVSZ0RTxIjblLV87vs7ADM12m.jpg', '1992-05-28', 231605150, 100, 'Released', 'No booze! No sex! No drugs!... No way!', 'Sister Act', 0, 6.822, 2717, '2022-12-02 02:06:25', 0);

INSERT INTO `zanr` (`id`, `naziv`) VALUES (12, 'Adventure'), (14, 'Fantasy'), (16, 'Animation'), (18, 'Drama'), (28, 'Action'), (35, 'komedija'), (53, 'Thriller'), (80, 'zanr123'), (99, 'Documentary'), (878, 'Science fiction'), (10751, 'Family'), (10752, 'War'), (10770, 'TV Movie');

INSERT INTO `film_ima_zanr` (`film_id`, `zanr_id`) VALUES (18, 12), (105, 12), (128, 12), (200, 12), (201, 12), (204, 12), (601, 12), (18, 14), (128, 14), (129, 14), (601, 14), (2006, 14), (2008, 14), (128, 16), (129, 16), (15, 18), (66, 18), (110, 18), (126, 18), (127, 18), (150, 18), (203, 18), (204, 18), (205, 18), (600, 18);

INSERT INTO `korisnik_has_film` (film_id, korisnik_id) select film.id, korisnik.id from film, korisnik where korime='admin';
-- delete from korisnik_has_film where film_id=2;

select * from zanr;
select * from film_ima_zanr;
select id from film;
select * from film WHERE prijedlog=0 LIMIT 10;
update film set prijedlog=0 where id=128;
update korisnik set lozinka="9bf8be4d1bdf4f31acca2c7fc3172cc57e0a49e25110ef21be0df6fe859ce112" where korime="admin"
select naslov, prijedlog from film where id=128
select * from film;
select * from korisnik_has_film;
select korime, lozinka from korisnik where korime='admin';
select * from tip_korisnika;
        --autorizacija = "?jwt=" + zahtjev.session.jwt;
