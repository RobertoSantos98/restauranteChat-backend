import { Router } from "express";
import { PratoController } from "../controllers/PratoController";

const router = Router();
const controller = new PratoController();

router.get("/:page/:limit", controller.listarTodos.bind(controller));
router.post("/", controller.criarPrato.bind(controller));
router.put("/:id", controller.atualizarPrato.bind(controller));
router.get("/:id", controller.buscarPorId.bind(controller));
router.delete("/:id", controller.deletarPrato.bind(controller));

export default router;