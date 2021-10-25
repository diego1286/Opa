DROP DATABASE IF EXISTS Opa;
CREATE DATABASE IF NOT EXISTS Opa;
USE Opa;

CREATE TABLE IF NOT EXISTS usuario(
id INT NOT NULL AUTO_INCREMENT,
username varchar(120) NOT NULL,
password VARCHAR(250) NOT NULL,
PRIMARY KEY(id),
UNIQUE(username)
);


CREATE TABLE IF NOT EXISTS empleados(
id INT NOT NULL AUTO_INCREMENT,
first_name  VARCHAR(120) NOT NULL,
last_name VARCHAR(120) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS roles_usuarios(
roles_id INT NOT NULL,
empleados_id INT NOT NULL,
PRIMARY KEY(roles_id, empleados_id),
FOREIGN KEY(roles_id) REFERENCES roles(id),
FOREIGN KEY(empleados_id) REFERENCES empleados(id)
);

CREATE TABLE IF NOT EXISTS company(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(45) NOT NULL,
email VARCHAR(120) NOT NULL,
logo MEDIUMBLOB NOT NULL,
website VARCHAR(45) NOT NULL,
company_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(company_id) REFERENCES empleados(id)
);
INSERT INTO roles(username, password, rol)
VALUES('admin@admin.com', '$2a$10$lYfoSY5IYtbzmUpnMnvdK.p6EiAlQl5nWQ9aUGEYbcjJFnTKPniim');
SELECT * FROM roles;

SELECT * FROM empleados;