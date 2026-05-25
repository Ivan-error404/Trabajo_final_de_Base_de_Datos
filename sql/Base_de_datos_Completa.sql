-- =====================================
-- CREACIÓN DE BASE DE DATOS
-- =====================================
DROP DATABASE IF EXISTS cine;
CREATE DATABASE cine;
USE cine;

-- =====================================
-- TABLAS
-- =====================================

CREATE TABLE departamento (
    id_departamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE empleado (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    puesto VARCHAR(100),
    id_departamento INT,
    FOREIGN KEY (id_departamento) 
        REFERENCES departamento(id_departamento)
);

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    telefono VARCHAR(20),
    puntos INT DEFAULT 0
);

CREATE TABLE pelicula (
    id_pelicula INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    duracion INT,
    clasificacion VARCHAR(10),
    genero VARCHAR(50)
);

CREATE TABLE sala (
    id_sala INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    capacidad INT NOT NULL
);

CREATE TABLE asiento (
    id_asiento INT AUTO_INCREMENT PRIMARY KEY,
    fila CHAR(1),
    numero INT,
    id_sala INT,
    UNIQUE (fila, numero, id_sala),
    FOREIGN KEY (id_sala) 
        REFERENCES sala(id_sala)
);

CREATE TABLE sesion (
    id_sesion INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    id_pelicula INT,
    id_sala INT,
    FOREIGN KEY (id_pelicula) 
        REFERENCES pelicula(id_pelicula),
    FOREIGN KEY (id_sala) 
        REFERENCES sala(id_sala)
);

CREATE TABLE venta (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_cliente INT,
    total DECIMAL(8,2),
    FOREIGN KEY (id_cliente) 
        REFERENCES cliente(id_cliente)
);

CREATE TABLE entrada (
    id_entrada INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT,
    id_sesion INT,
    id_asiento INT,
    precio DECIMAL(6,2),

    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_sesion) REFERENCES sesion(id_sesion),
    FOREIGN KEY (id_asiento) REFERENCES asiento(id_asiento),

    UNIQUE (id_sesion, id_asiento)
);

CREATE TABLE promocion (
    id_promocion INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(200),
    descuento DECIMAL(5,2)
);


-- =====================================
-- DATOS
-- =====================================

-- Departamentos
INSERT INTO departamento (nombre) VALUES
('Ventas'), ('RRHH'), ('Mantenimiento'), ('Marketing'),
('Programación'), ('Finanzas'), ('Atención al Cliente'), ('Seguridad');

-- Empleados
INSERT INTO empleado (nombre, apellido, puesto, id_departamento) VALUES
('Juan', 'Pérez', 'Vendedor', 1),
('Ana', 'García', 'RRHH', 2),
('Luis', 'Martínez', 'Técnico', 3),
('Marta', 'Sánchez', 'Marketing', 4),
('Carlos', 'Ruiz', 'Programador', 5),
('Elena', 'Torres', 'Contable', 6),
('David', 'Navarro', 'Atención Cliente', 7),
('Sergio', 'Ortega', 'Seguridad', 8);

-- Clientes
INSERT INTO cliente (nombre, email, telefono) VALUES
('Carlos López', 'carlos@email.com', '123456789'),
('Lucía Fernández', 'lucia@email.com', '987654321'),
('Pedro Gómez', 'pedro@email.com', '654123987'),
('María Díaz', 'maria@email.com', '741852963'),
('Javier Romero', 'javier@email.com', '159753486'),
('Laura Castro', 'laura@email.com', '852369741');

-- Películas
INSERT INTO pelicula (titulo, duracion, clasificacion, genero) VALUES
('Inception', 148, 'PG-13', 'Sci-Fi'),
('Titanic', 195, 'PG-13', 'Drama'),
('Avatar', 162, 'PG-13', 'Sci-Fi'),
('The Dark Knight', 152, 'PG-13', 'Acción'),
('Interstellar', 169, 'PG-13', 'Sci-Fi'),
('Joker', 122, 'R', 'Drama');

-- Salas
INSERT INTO sala (nombre, capacidad) VALUES
('Sala 1', 100),
('Sala 2', 80),
('Sala 3', 120);

-- Asientos (ejemplo reducido pero funcional)
INSERT INTO asiento (fila, numero, id_sala) VALUES
('A',1,1),('A',2,1),('A',3,1),
('B',1,1),('B',2,1),('B',3,1),

('A',1,2),('A',2,2),
('B',1,2),('B',2,2),

('A',1,3),('A',2,3),
('B',1,3),('B',2,3);

-- Sesiones
INSERT INTO sesion (fecha, hora, id_pelicula, id_sala) VALUES
('2026-05-05','18:00:00',1,1),
('2026-05-05','21:00:00',2,1),
('2026-05-06','20:00:00',3,2),
('2026-05-06','22:00:00',4,3);

-- Ventas
INSERT INTO venta (id_cliente, total) VALUES
(1,20.00),
(2,15.00),
(3,10.00);

-- Entradas
INSERT INTO entrada (id_venta, id_sesion, id_asiento, precio) VALUES
(1,1,1,10.00),
(1,1,2,10.00),
(2,2,3,15.00),
(3,3,7,10.00);


-- -----------------------------------
-- CONSULTAS
-- ------------------------------------

-- Películas
SELECT * FROM pelicula;

-- Sesiones por sala
SELECT s.id_sesion, p.titulo, s.fecha, s.hora
FROM sesion s
JOIN pelicula p ON s.id_pelicula = p.id_pelicula
WHERE s.id_sala = 1;

-- Ventas por día
SELECT DATE(fecha) AS dia, SUM(total) AS total_dia
FROM venta
GROUP BY dia;

-- Clientes con más compras
SELECT cliente.nombre, COUNT(venta.id_venta) AS total_compras
FROM cliente
JOIN venta ON cliente.id_cliente = venta.id_cliente
GROUP BY cliente.id_cliente
ORDER BY total_compras DESC;

-- Ocupación
SELECT sesion.id_sesion,
       COUNT(entrada.id_entrada) AS entradas_vendidas,
       sala.capacidad,
       (COUNT(entrada.id_entrada) / sala.capacidad) * 100 AS ocupacion
FROM sesion
JOIN sala ON sesion.id_sala = sala.id_sala
LEFT JOIN entrada ON sesion.id_sesion = entrada.id_sesion
GROUP BY sesion.id_sesion;