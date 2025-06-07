const express = require("express");
const router = express.Router();

const portafoliosRoutes = require("./portafolios.routes");
// En el futuro: const usuariosRoutes = require("./usuarios.routes");

router.use("/portafolios", portafoliosRoutes);
// router.use("/usuarios", usuariosRoutes);

module.exports = router;