
-- -------------------------------------
-- TABLAS
-- -------------------------------------

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
