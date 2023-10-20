CREATE TABLE IF NOT EXISTS Listes (
  Plante_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Photos BLOB NOT NULL,
  Nomplante VARCHAR(25) NOT NULL,
  Geolocalisation VARCHAR(25) NOT NULL,
  Proprietaire VARCHAR(25) NOT NULL,
  Commentaires TEXT
);

INSERT INTO Listes (
  photos,
  nom_plante,
  geolocalisation,
  proprietaire,
  commentaires) VALUES
('Mrs. Bridge', 'Evan S. Connell', 'Premier de la série','jkfhvisbfjvbs','kjhhjvhjvh'),
('Mr. Bridge', 'Evan S. Connell', 'Second de la série','sfgjvbsfkbvq','jhvhjvjcgc'),
('L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne','zefjklsqbjkqs','dfgkjnbgjkdbrg');


INSERT INTO Livres (Livre_ID, Titre, Auteur, Commentaires) VALUES
(1, 'Mrs. Bridge', 'Evan S. Connell', 'Premier de la série'),
(2, 'Mr. Bridge', 'Evan S. Connell', 'Second de la série'),
(3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');

SELECT * FROM utilisateur


CREATE TABLE IF NOT EXISTS botaniste (
  id_botaniste INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname VARCHAR(20) NOT NULL,
  lastname VARCHAR(20) NOT NULL,
  pseudo VARCHAR(20) NOT NULL,
  password VARCHAR(300) NOT NULL
);

DROP TABLE botaniste

CREATE TABLE IF NOT EXISTS utilisateur (
  id_user INTEGER PRIMARY KEY AUTOINCREMENT,
  user_firstname VARCHAR(20) NOT NULL,
  user_lastname VARCHAR(20) NOT NULL,
  pseudo VARCHAR(20) NOT NULL,
  password VARCHAR(300) NOT NULL,
  role VARCHAR(20) NOT NULL,
  nombre_plante INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS plante (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_user INTEGER NOT NULL,
  commentaire VARCHAR(200),
  geolocalisation REAL NOT NULL,
  photos BLOB NOT NULL
);


INSERT INTO connexion (pseudo,password) VALUES
('arthur','password'),
('flobert','password'),
('riyesan', 'password');

SELECT * FROM utilisateur

CREATE TABLE IF NOT EXISTS commenter (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_plante INTEGER NOT NULL,
  commentaire VARCHAR(200),
);

alter COLUMN id INTEGER PRIMARY KEY AUTOINCREMENT 


