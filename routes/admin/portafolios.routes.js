const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//Controlador
const portafolioController = require("../../controllers/portafolio.controller");

// GET: Muestra la vista para cargar Excel y generar portafolios
router.get("/crear",portafolioController.renderPagina);

// POST: Procesa Excel y genera datos en memoria para validar
router.post("/procesar", upload.single("archivoExcel"), portafolioController.procesarExcel);

// POST: Guarda usuarios y portafolios confirmados en la base de datos
router.post("/confirmar",portafolioController.guardarTodo);


module.exports = router;
