Database: PlayBow

CREATE TABLE playmates (
  id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(20),
  breed VARCHAR(20),
  age INTEGER,
  gender VARCHAR(20),
  sterile VARCHAR(20),
  vaccinated VARCHAR(20),
  location VARCHAR(20),
  size VARCHAR(20),
  bio VARCHAR(1000),
  playstyles TEXT[],
	created TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(20),
  breed VARCHAR(20),
  age INTEGER,
  gender VARCHAR(20),
  sterile VARCHAR(20),
  vaccinated VARCHAR(20),
  location VARCHAR(20),
  size VARCHAR(20),
  bio VARCHAR(1000),
  playstyles TEXT[],
	created TIMESTAMP DEFAULT current_timestamp
);
