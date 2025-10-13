import { Router } from "express";
import { IngredienteController } from '../controllers/IngredienteController'

const router = Router();
const controller = new IngredienteController();

router.get("/", controller.buscarTodos.bind(controller));
router.post("/", controller.criarIngredientes.bind(controller));
router.get("/buscar/:nome", controller.buscarPorNome.bind(controller));
router.get("/:id", controller.buscarPorId.bind(controller));
router.get("/:page/:limit", controller.buscarTodosPaginado.bind(controller));
router.delete("/:id", controller.deletarIngrediente.bind(controller));

export default router;