
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