import { Server } from "socket.io";
import { IPedidoEventPublisher } from "./IPedidoEventPublisher";
import { Pedido } from "../../generated/prisma";


export class PedidoEventPublisher implements IPedidoEventPublisher {
    constructor( private io: Server){}

    emitirNovoPedido(pedido: Pedido): void {
        this.io.emit("novoPedido", pedido);
    }

    emitirAtualizacaoStatus(pedido: Pedido): void {
        this.io.emit("atualizaçãoPedido", pedido);
    }
}