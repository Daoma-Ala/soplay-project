const ServicioService = require('../service/ServicioService.js');
const fs = require('fs').promises; 
const path = require('path');

exports.getAllServicios = async (req, res) => {
    try {
        const servicios = await ServicioService.getAllServicios();
        res.json(servicios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo consultar todos los servicios", error: error.message });
    }
};

exports.addServicio = async (req, res) => {
    try {
        const servicioData = req.body;
        servicioData.foto = req.file.path;
        const id_servicio = await ServicioService.addServicio(servicioData);
        res.status(201).json({ id_servicio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo agregar el servicio", error: error.message });
    }
};

exports.getServicioById = async (req, res) => {
    try {
        const id_servicio = parseInt(req.params.id);
        if (isNaN(id_servicio)) {
            return res.status(400).json({ error: 'ID del servicio no válido' });
        }
        const servicio = await ServicioService.getServicioById(id_servicio);

        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json(servicio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo obtener el servicio", error: error.message });
    }
};

exports.updateServicio = async (req, res) => {
    try {
        const id_servicio = parseInt(req.params.id);
        if (isNaN(id_servicio)) {
            return res.status(400).json({ error: 'ID del servicio no válido' });
        }
        const servicioData = req.body;
        await ServicioService.updateServicio(id_servicio, servicioData);
        res.status(201).json({ message: 'Servicio actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo actualizar el servicio", error: error.message });
    }
};

exports.deleteServicio = async (req, res) => {
    try {
        const id_servicio = parseInt(req.params.id);
        if (isNaN(id_servicio)) {
            return res.status(400).json({ error: 'ID del servicio no válido' });
        }
        const servicio = await ServicioService.getServicioById(id_servicio);

        if(!servicio){
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        // Si tiene foto el servicio desde la base de datos
        if (servicio.foto) {
            const fotoPath = path.resolve(servicio.foto.ruta); // se extrae la ruta completa
            await fs.unlink(fotoPath).catch((err) => {
                console.error('Error al eliminar la foto:', err.message);
            });
        }
        await ServicioService.deleteServicio(id_servicio);
        res.status(201).json({ message: 'Servicio eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se pudo eliminar el servicio", error: error.message });
    }
};

