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

DELIMITER ;
