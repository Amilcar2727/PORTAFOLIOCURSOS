const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/cargaAcademica.controller");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Get: Para mostrar la pagina de carga
router.get("/subir",controller.renderSubirPagina);

// Post: Para procesar el excel
router.post("/subir_excel", upload.single("archivoExcel"), controller.procesarExcel);

// Post: Para guardar usuarios
router.post("/guardar-usuarios",controller.guardarUsuarios);

module.exports = router;
