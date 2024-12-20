create database soplay;
use soplay;

CREATE TABLE `usuarios` (
  `id_usuario` int(11) PRIMARY KEY auto_increment,
  `correo` varchar(80) NOT NULL unique,
  `password` varchar(20) NOT NULL,
  `nombres` varchar(80) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `tipo` ENUM('CLIENTE', 'ENCARGADO') NOT NULL DEFAULT 'CLIENTE',
  `sexo` ENUM('MASCULINO', 'FEMENINO', 'OTRO') NOT NULL,
  `telefono` varchar(20) NOT NULL
);

CREATE TABLE `direccion` (
  `id_direccion` int(11) PRIMARY KEY auto_increment,
  `calle` varchar(80) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `colonia` varchar(80) NOT NULL,
  `ciudad` varchar(80) NOT NULL,
  `estado` varchar(80) NOT NULL,
  `codigo_postal` varchar(20) NOT NULL,
  `id_usuario` int NOT NULL,
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE
);

CREATE TABLE `cotizaciones` (
  `id_cotizacion` int(11) primary key auto_increment,
  `serie` varchar(150) unique,
  `fecha_cotizacion` datetime NOT NULL DEFAULT current_timestamp,
  `monto` float,
  `estatus` ENUM('PENDIENTE', 'APROBADA', 'RECHAZADA', 'BORRADOR') NOT NULL DEFAULT 'BORRADOR',
  `id_usuario` int(11) ,
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON delete set null
);

CREATE TABLE `servicios` (
  `id_servicio` int(11) PRIMARY KEY auto_increment,
  `nombre` varchar(80) NOT NULL unique,
  `descripcion` varchar(255) NOT NULL,
  `precio` float NOT NULL
);

CREATE TABLE `fotos` (
  `id_foto` int(11) PRIMARY KEY auto_increment,
  `ruta` varchar(400) NOT NULL,
  `id_servicio` int(11) NOT NULL,
  FOREIGN KEY (`id_servicio`) REFERENCES `servicios`(`id_servicio`) ON DELETE CASCADE
);

CREATE TABLE `cotizaciones_servicios` (
  `id_cotizacion` INT(11),
  `id_servicio` INT(11),
  `cantidad` int NOT NULL,
  `sub_total` float ,
  PRIMARY KEY (`id_cotizacion`,`id_servicio`),
  FOREIGN KEY (`id_cotizacion`) REFERENCES `cotizaciones`(`id_cotizacion`) ON DELETE CASCADE,
  FOREIGN KEY (`id_servicio`) REFERENCES servicios(`id_servicio`) ON DELETE CASCADE
);


#Triggers

DELIMITER //

CREATE TRIGGER before_insert_cotizacion_servicios
BEFORE insert ON cotizaciones_servicios
FOR EACH ROW
BEGIN
    DECLARE precio FLOAT;

    SELECT s.precio INTO precio
    FROM servicios s
    WHERE s.id_servicio = NEW.id_servicio;

    SET NEW.sub_total = precio * NEW.cantidad;
END;

//

CREATE TRIGGER before_update_cotizacion_servicios
BEFORE UPDATE ON cotizaciones_servicios
FOR EACH ROW
BEGIN
    DECLARE precio FLOAT;

    SELECT s.precio INTO precio
    FROM servicios s
    WHERE s.id_servicio = NEW.id_servicio;

    SET NEW.sub_total = precio * NEW.cantidad;
END;

//

CREATE TRIGGER after_insert_cotizacion_servicio
AFTER INSERT ON cotizaciones_servicios
FOR EACH ROW
BEGIN
    DECLARE total FLOAT;

    SELECT SUM(sub_total) INTO total
    FROM cotizaciones_servicios
    WHERE id_cotizacion = NEW.id_cotizacion;

    UPDATE cotizaciones
    SET monto = total
    WHERE id_cotizacion = NEW.id_cotizacion;
END;

//

CREATE TRIGGER after_update_cotizacion_servicio
AFTER UPDATE ON cotizaciones_servicios
FOR EACH ROW
BEGIN
    DECLARE total FLOAT;

    SELECT SUM(sub_total) INTO total
    FROM cotizaciones_servicios
    WHERE id_cotizacion = NEW.id_cotizacion;

    UPDATE cotizaciones
    SET monto = total
    WHERE id_cotizacion = NEW.id_cotizacion;
END;

//

CREATE TRIGGER after_delete_cotizacion_servicio
AFTER DELETE ON cotizaciones_servicios
FOR EACH ROW
BEGIN
    DECLARE total FLOAT;

    SELECT SUM(sub_total) INTO total
    FROM cotizaciones_servicios
    WHERE id_cotizacion = OLD.id_cotizacion;

    UPDATE cotizaciones
    SET monto = total
    WHERE id_cotizacion = OLD.id_cotizacion;
END;

//

CREATE TRIGGER before_insert_cotizacion
BEFORE INSERT ON cotizaciones
FOR EACH ROW
BEGIN
    DECLARE random_letter1 CHAR(1);
    DECLARE random_letter2 CHAR(1);
    DECLARE random_number INT;

    SET random_letter1 = CHAR(FLOOR(65 + (RAND() * 26))); 
    SET random_letter2 = CHAR(FLOOR(65 + (RAND() * 26))); 

    SET random_number = FLOOR(1000 + (RAND() * 9000)); 
    SET NEW.serie = CONCAT(random_letter1, random_letter2, random_number, random_letter1);
END//

DELIMITER ;

INSERT INTO usuarios (correo, password, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, tipo, sexo, telefono)
VALUES ('encargado@gmail.com', 'password123', 'Daniel', 'López', 'López', '1985-05-15', 'ENCARGADO', 'MASCULINO', '555-123-4567');




