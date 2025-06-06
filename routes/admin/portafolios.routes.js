const express = require("express");
const router = express.Router();
//const multer = require("multer");
//const controller = require("../../controllers/portafolio.controller");

//const storage = multer.memoryStorage();
//const upload = multer({storage: storage});

//Controlador
const portafolioController = require("../../controllers/portafolio.controller");

// Get: Para mostrar la pagina de carga
router.get("/subir",portafolioController.renderSubirPagina);

// Post: Para procesar el excel y generar portafolios
//(router.post("/subir_excel", upload.single("archivoExcel"), controller.procesarExcel);
router.post("/subir_excel", portafolioController.procesarExcel);

// Post: Para guardar usuarios despues de validacion
router.post("/guardar_usuarios",portafolioController.guardarUsuarios);


module.exports = router;
