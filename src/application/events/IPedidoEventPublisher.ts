import { Pedido } from "../../generated/prisma";

export interface IPedidoEventPublisher {
    emitirNovoPedido(pedido: Pedido): void;
    emitirAtualizacaoStatus(pedido: Pedido): void;
}