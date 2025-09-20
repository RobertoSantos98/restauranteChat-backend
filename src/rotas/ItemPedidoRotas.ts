import { Router } from "express";
import { ItemPedidoController } from "../controllers/ItemPedidoController";

const router = Router();
const controller = new ItemPedidoController();

router.get("/", controller.criarItemPedido.bind(controller));
router.put("/:id", controller.atualizarPedido.bind(controller));
router.delete("/:id", controller.deletarItemPedido.bind(controller));

export default router;