SELECT 
	pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE datname = 'dados_geograficos' AND pid <> pg_backend_pid();
DROP DATABASE IF EXISTS dados_geograficos;
CREATE DATABASE dados_geograficos;

\c dados_geograficos;

CREATE EXTENSION postgis;

CREATE TABLE bairro (
  id SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL
);
SELECT AddGeometryColumn ('public', 'bairro', 'geometria', 4326, 'POLYGON', 2);

CREATE TABLE ocorrencia_tipo (
	id SERIAL PRIMARY KEY,
	nome VARCHAR NOT NULL
);

CREATE TABLE ocorrencia (
	id SERIAL PRIMARY KEY,
	descricao VARCHAR NOT NULL,
	tipo_id INT NOT NULL references ocorrencia_tipo(id)
);
SELECT AddGeometryColumn ('public', 'ocorrencia', 'geometria', 4326, 'POINT', 2);