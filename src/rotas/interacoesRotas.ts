import { Router } from "express";
import { InteracoesController } from "../controllers/InteracoesController";

const router = Router();
const controller = new InteracoesController();

router.get("/", controller.buscarTodasInteracoes.bind(controller));
router.get("/:id", controller.buscarInteracaoUsuario.bind(controller));

export default router;