\c dados_geograficos;

 INSERT INTO bairro (nome, geometria) VALUES (
  'Bairro 1',
  st_geomfromtext('POLYGON((-48.0 -26.0, -48.0 -25.9, -47.9 -25.9, -47.9 -26, -48.0 -26.0))', 4326)
);

INSERT INTO bairro (nome, geometria) VALUES (
  'Bairro 2',
  st_geomfromtext('POLYGON((-47.0 -25.0, -47.0 -24.9, -46.9 -24.9, -46.9 -25, -47.0 -25.0))', 4326)
);

INSERT INTO ocorrencia_tipo (nome) VALUES ('Furto');
INSERT INTO ocorrencia_tipo (nome) VALUES ('Assalto');
INSERT INTO ocorrencia_tipo (nome) VALUES ('Pancadaria');

INSERT INTO ocorrencia (descricao, tipo_id, geometria) VALUES (
  'Roubaram a lojinha',
  1,
  st_geomfromtext('POINT(-47.95 -26.917412)', 4326)
);

INSERT INTO ocorrencia (descricao, tipo_id, geometria) VALUES (
  'Assalto à mão armada no banco da praça',
  2,
  st_geomfromtext('POINT(-47.98 -25.98)', 4326)
);

INSERT INTO ocorrencia (descricao, tipo_id, geometria) VALUES (
  'Soco, soco, bate, bate.',
  3,
  st_geomfromtext('POINT(-47.93 -25.93)', 4326)
);

INSERT INTO ocorrencia (descricao, tipo_id, geometria) VALUES (
  'Street Fight',
  3,
  st_geomfromtext('POINT(-46.99 -24.95)', 4326)
);