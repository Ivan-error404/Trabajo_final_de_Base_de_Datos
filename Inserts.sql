


-- -------------------------------------
-- Inserts
-- -------------------------------------

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

-- Asientos 
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
