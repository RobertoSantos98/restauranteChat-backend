import express from "express";
import cors from 'cors';

import usuarioRoutes from "./rotas/UsuarioRotas"
import cardapioRotas from "./rotas/CardapioRotas"
import pratoRoute from "./rotas/PratoRotas"
import interacoesRoute from "./rotas/interacoesRotas"
import ClienteRoute from "./rotas/ClienteRotas"
import PedidoRoute from "./rotas/PedidoRotas"
import ItemPedido from "./rotas/ItemPedidoRotas"
import IngredienteRoutes from "./rotas/IngredientesRotas";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor Funcionando Corretamente");
});

app.use("/usuario", usuarioRoutes);
app.use("/cardapio", cardapioRotas);
app.use("/prato", pratoRoute);
app.use("/interacoes", interacoesRoute);
app.use("/cliente", ClienteRoute);
app.use("/pedido", PedidoRoute);
app.use("/itempedido", ItemPedido);
app.use("/ingrediente", IngredienteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

