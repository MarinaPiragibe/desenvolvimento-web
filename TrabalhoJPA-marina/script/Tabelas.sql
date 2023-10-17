https://dev.mysql.com/downloads/

Download MySQL Community Server

Últimas versões:
- 5.5
- 5.6
- 5.7
- 8.0 (atual)

DROP TABLE if exists dev_web_cinema.ingresso;

CREATE TABLE dev_web_cinema.ingresso (
  cod_ingresso INT NOT NULL AUTO_INCREMENT,
  titulo_filme VARCHAR(100) NOT NULL,
  sessao DATE NOT NULL,
  data_compra DATE DEFAULT NULL,
  PRIMARY KEY (cod_ingresso)
)
ENGINE = INNODB
CHARACTER SET utf8mb4;

-- InnoDB is a general-purpose storage engine that balances high reliability and high
-- performance. In MySQL 8.0, InnoDB is the default MySQL storage engine. Unless you
-- have configured a different default storage engine, issuing a CREATE TABLE statement
-- without an ENGINE clause creates an InnoDB table.

-- MySQL supports multiple Unicode character sets: utf8mb4 : A UTF-8 encoding of the
-- Unicode character set using one to four bytes per character.

INSERT INTO dev_web_cinema.INGRESSO(TITULO_FILME, SESSAO, DATA_COMPRA)
VALUES('10 Coisas que eu odeio em você', curdate(), curdate());

INSERT INTO dev_web_cinema.INGRESSO(TITULO_FILME, SESSAO, DATA_COMPRA)
VALUES('Nosso Sonho', curdate(), curdate());
