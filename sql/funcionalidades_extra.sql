USE cine;

-- =============================================
-- 1. VISTAS
-- =============================================

-- Vista: Ocupación de salas por sesión
CREATE OR REPLACE VIEW v_ocupacion_salas AS
SELECT s.id_sesion, p.titulo, s.fecha, s.hora,
       sa.nombre AS sala, sa.capacidad,
       COUNT(e.id_entrada) AS entradas_vendidas,
       ROUND((COUNT(e.id_entrada) / sa.capacidad) * 100, 2) AS porcentaje_ocupacion
FROM sesion s
JOIN pelicula p ON s.id_pelicula = p.id_pelicula
JOIN sala sa ON s.id_sala = sa.id_sala
LEFT JOIN entrada e ON s.id_sesion = e.id_sesion
GROUP BY s.id_sesion;

-- Vista: Ventas por día
CREATE OR REPLACE VIEW v_ventas_por_dia AS
SELECT DATE(fecha) AS dia, COUNT(id_venta) AS num_ventas,
       SUM(total) AS total_ventas
FROM venta
GROUP BY DATE(fecha)
ORDER BY dia;

-- Vista: Clientes frecuentes
CREATE OR REPLACE VIEW v_clientes_frecuentes AS
SELECT c.id_cliente, c.nombre, c.email, c.puntos,
       COUNT(v.id_venta) AS total_compras,
       SUM(v.total) AS total_gastado
FROM cliente c
LEFT JOIN venta v ON c.id_cliente = v.id_cliente
GROUP BY c.id_cliente
ORDER BY total_gastado DESC;


-- =============================================
-- 2. PROCEDIMIENTOS ALMACENADOS
-- =============================================

DELIMITER //

-- Procedimiento: Comprar entrada(s)
CREATE PROCEDURE sp_comprar_entrada(
    IN p_id_cliente INT,
    IN p_id_sesion INT,
    IN p_id_asiento INT,
    IN p_precio DECIMAL(6,2),
    OUT p_resultado VARCHAR(200)
)
BEGIN
    DECLARE v_id_venta INT;
    DECLARE v_existe INT;
    DECLARE v_ocupado INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_resultado = 'Error: no se pudo completar la compra';
    END;

    START TRANSACTION;

    -- Verificar que el asiento no esté ocupado en esa sesión
    SELECT COUNT(*) INTO v_ocupado
    FROM entrada
    WHERE id_sesion = p_id_sesion AND id_asiento = p_id_asiento;

    IF v_ocupado > 0 THEN
        SET p_resultado = 'Error: el asiento ya está ocupado en esta sesión';
        ROLLBACK;
    ELSE
        -- Verificar que el cliente existe
        SELECT COUNT(*) INTO v_existe FROM cliente WHERE id_cliente = p_id_cliente;
        IF v_existe = 0 THEN
            SET p_resultado = 'Error: el cliente no existe';
            ROLLBACK;
        ELSE
            -- Crear la venta
            INSERT INTO venta (id_cliente, total) VALUES (p_id_cliente, p_precio);
            SET v_id_venta = LAST_INSERT_ID();

            -- Insertar la entrada
            INSERT INTO entrada (id_venta, id_sesion, id_asiento, precio)
            VALUES (v_id_venta, p_id_sesion, p_id_asiento, p_precio);

            COMMIT;
            SET p_resultado = CONCAT('Compra exitosa. ID Venta: ', v_id_venta);
        END IF;
    END IF;
END //

-- Procedimiento: Actualizar puntos del cliente
CREATE PROCEDURE sp_actualizar_puntos(
    IN p_id_cliente INT,
    IN p_puntos INT
)
BEGIN
    UPDATE cliente
    SET puntos = puntos + p_puntos
    WHERE id_cliente = p_id_cliente;
END //

DELIMITER ;


-- =============================================
-- 3. FUNCIONES
-- =============================================

DELIMITER //

-- Función: Calcular descuento sobre un precio
CREATE FUNCTION fn_calcular_descuento(
    p_precio DECIMAL(6,2),
    p_porcentaje DECIMAL(5,2)
)
RETURNS DECIMAL(6,2)
DETERMINISTIC
BEGIN
    DECLARE v_resultado DECIMAL(6,2);
    SET v_resultado = p_precio - (p_precio * p_porcentaje / 100);
    RETURN v_resultado;
END //

-- Función: Obtener porcentaje de ocupación de una sesión
CREATE FUNCTION fn_ocupacion_sala(p_id_sesion INT)
RETURNS DECIMAL(5,2)
DETERMINISTIC
BEGIN
    DECLARE v_capacidad INT;
    DECLARE v_vendidas INT;
    DECLARE v_ocupacion DECIMAL(5,2);

    SELECT sa.capacidad INTO v_capacidad
    FROM sesion s JOIN sala sa ON s.id_sala = sa.id_sala
    WHERE s.id_sesion = p_id_sesion;

    SELECT COUNT(*) INTO v_vendidas
    FROM entrada
    WHERE id_sesion = p_id_sesion;

    IF v_capacidad > 0 THEN
        SET v_ocupacion = (v_vendidas / v_capacidad) * 100;
    ELSE
        SET v_ocupacion = 0;
    END IF;

    RETURN v_ocupacion;
END //

DELIMITER ;


-- =============================================
-- 4. TRIGGERS
-- =============================================

DELIMITER //

-- Trigger: Actualizar puntos del cliente al comprar entrada
CREATE TRIGGER tg_actualizar_puntos
AFTER INSERT ON entrada
FOR EACH ROW
BEGIN
    DECLARE v_id_cliente INT;

    SELECT id_cliente INTO v_id_cliente
    FROM venta
    WHERE id_venta = NEW.id_venta;

    UPDATE cliente
    SET puntos = puntos + FLOOR(NEW.precio)
    WHERE id_cliente = v_id_cliente;
END //

-- Trigger: Evitar sobreventa de aforo en una sesión
CREATE TRIGGER tg_verificar_aforo
BEFORE INSERT ON entrada
FOR EACH ROW
BEGIN
    DECLARE v_capacidad INT;
    DECLARE v_vendidas INT;

    SELECT sa.capacidad INTO v_capacidad
    FROM sesion s
    JOIN sala sa ON s.id_sala = sa.id_sala
    WHERE s.id_sesion = NEW.id_sesion;

    SELECT COUNT(*) INTO v_vendidas
    FROM entrada
    WHERE id_sesion = NEW.id_sesion;

    IF v_vendidas >= v_capacidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No hay asientos disponibles en esta sesión';
    END IF;
END //

DELIMITER ;


-- =============================================
-- 5. EVENTO PROGRAMADO
-- =============================================

DELIMITER //

CREATE EVENT e_limpiar_ventas_antiguas
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
BEGIN
    DELETE FROM entrada
    WHERE id_venta IN (
        SELECT id_venta FROM venta
        WHERE fecha < DATE_SUB(NOW(), INTERVAL 1 YEAR)
    );

    DELETE FROM venta
    WHERE fecha < DATE_SUB(NOW(), INTERVAL 1 YEAR);
END //

DELIMITER ;

-- Activar el scheduler de eventos si no está activo
SET GLOBAL event_scheduler = ON;


-- =============================================
-- 6. USUARIOS Y PERMISOS
-- =============================================

-- Crear usuarios
CREATE USER IF NOT EXISTS 'admin_cine'@'localhost' IDENTIFIED BY 'admin123';
CREATE USER IF NOT EXISTS 'vendedor'@'localhost' IDENTIFIED BY 'vendedor123';
CREATE USER IF NOT EXISTS 'consultor'@'localhost' IDENTIFIED BY 'consultor123';

-- Permisos para admin (todos los permisos)
GRANT ALL PRIVILEGES ON cine.* TO 'admin_cine'@'localhost';

-- Permisos para vendedor (gestionar ventas y entradas)
GRANT SELECT, INSERT, UPDATE ON cine.venta TO 'vendedor'@'localhost';
GRANT SELECT, INSERT ON cine.entrada TO 'vendedor'@'localhost';
GRANT SELECT ON cine.cliente TO 'vendedor'@'localhost';
GRANT SELECT ON cine.sesion TO 'vendedor'@'localhost';
GRANT SELECT ON cine.asiento TO 'vendedor'@'localhost';
GRANT SELECT ON cine.sala TO 'vendedor'@'localhost';
GRANT SELECT ON cine.pelicula TO 'vendedor'@'localhost';
GRANT SELECT ON cine.promocion TO 'vendedor'@'localhost';

-- Permisos para consultor (solo lectura)
GRANT SELECT ON cine.* TO 'consultor'@'localhost';

FLUSH PRIVILEGES;
