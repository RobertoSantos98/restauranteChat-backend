import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router();
const controller = new UsuarioController();

router.get("/", controller.listarTodos.bind(controller));
router.get("/:id", controller.buscarPorId.bind(controller));
router.post("/", controller.criarUsuario.bind(controller));
router.put("/:id", controller.atualizarUsuario.bind(controller));
router.delete("/:id", controller.deletarUsuario.bind(controller));

export default router;