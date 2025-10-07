import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController";

const router = Router();
const controller = new PedidoController();

router.get("/:page/:limit", controller.buscarTodos.bind(controller));
router.post("/", controller.criarPedido.bind(controller));
router.get("/:id", controller.buscarPorIdPedido.bind(controller));
router.get("/cliente/:id", controller.buscarPorIdCliente.bind(controller));
router.put("/:id", controller.atualizarPedido.bind(controller));
router.delete("/:id", controller.deletarPedido.bind(controller));

export default router;