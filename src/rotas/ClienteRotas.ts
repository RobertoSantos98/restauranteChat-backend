import { ClienteController } from "../controllers/ClienteController";
import { Router } from "express";

const router = Router();
const controller = new ClienteController();

router.get("/", controller.buscarTodosClientes.bind(controller));
router.post("/", controller.criarCliente.bind(controller));
router.get("/:id", controller.buscarPorId.bind(controller));
router.put("/:id", controller.atualizarCliente.bind(controller));
router.delete("/:id", controller.deletarCliente.bind(controller));

export default router;
