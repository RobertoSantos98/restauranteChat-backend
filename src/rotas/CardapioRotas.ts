import { Router } from "express";
import { CardapioController } from "../controllers/CardapioController";

const router = Router();
const controller = new CardapioController();

router.get("/", controller.listarTodos.bind(controller));
router.post("/", controller.criarCardapio.bind(controller));
router.get("/:id", controller.buscarPorId.bind(controller));
router.get("/buscarData", controller.buscarPorData.bind(controller));
router.put("/:id", controller.atualizarCardapio.bind(controller));
router.delete("/:id", controller.removerCardapio.bind(controller));

export default router;