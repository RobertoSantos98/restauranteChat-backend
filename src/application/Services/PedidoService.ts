import { PedidoRepository, StatusPedido, transicoesValidas } from "../../infrastructure/repositories/PedidoRepository";
import { IPedidoEventPublisher } from "../events/IPedidoEventPublisher";

export class PedidoService {
    constructor(
        private eventPublisher: IPedidoEventPublisher,
        private repository: PedidoRepository = new PedidoRepository()
    ) { }

    async criarPedido(data: { clienteId: number, optional: string, status: StatusPedido, itens?: { pratoId: number, quantidade: number }[] }) {

        const salvo = await this.repository.criarPedido(data);
        this.eventPublisher.emitirNovoPedido(salvo);
        return salvo;
    }

    async listarTodos() {
        return await this.repository.listarTodosPedidos();
    }

    async buscarPedidoId(id: number) {
        return await this.repository.listarPorIdPedido(id)
    }

    async buscarPorIdCliente(id: number) {
        return await this.repository.listarPorUsuario(id)
    }

    async atualizarPedido(id: number, data: { clienteId: number, optional: string | null, status: StatusPedido }) {

        const encontrado = await this.repository.listarPorIdPedido(id);

        if (!encontrado) {
            throw new Error("Pedido não encontrado");
        }

        const statusAtual = encontrado.status as StatusPedido;
        const permitido = encontrado.status !== data.status && transicoesValidas[statusAtual].includes(data.status);

        if (data.status && !permitido) {
            throw new Error(`Transição de status de ${statusAtual} para ${data.status} não é permitida.`);
        }

        const atualizado = await this.repository.atualizarPedido(id, data);
        this.eventPublisher?.emitirAtualizacaoStatus(atualizado);

        return atualizado;
    }

    async atualizarStatus(id: number, status: StatusPedido) {
        if(!Object.values(StatusPedido).includes(status)){
            throw new Error("Status inválido");
        }
        return await this.repository.atualizarPedido(id, { status });
    }

    async deletarPedido(id: number) {
        return await this.repository.deletarPedido(id)
    }
}