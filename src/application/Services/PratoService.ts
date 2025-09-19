import { PratoRepository } from "../../infrastructure/repositories/PratoRepository";
import { MotivoInteracao } from "./InteracoesService";
import { interacoesService } from "./InteracoesService";

export class PratoService {
    private repository = new PratoRepository();
    private interacoesServices = new interacoesService();

    async criarPrato(data: { nome: string, descricao: string, valor: number, idCardapio: number, idUsuario: number }) {
        const criado = await this.repository.criarPrato({nome: data.nome, descricao: data.descricao, valor: data.valor, idCardapio: data.idCardapio});

        if (criado) {
            await this.interacoesServices.adicionarInteracao({ idUsuario: data.idUsuario, cardapioId: data.idCardapio, motivo: MotivoInteracao.ALTERACAO })
        }
        return criado;
    }

    async listarTodos() {
        return await this.repository.buscarTodos();
    }

    async buscarPorId(id: number) {
        return await this.repository.buscarPorId(id);
    }

    async atualizarPrato(id: number, data: Partial<{idUsuario: number, nome: string, descricao: string, valor: number, idCardapio: number }>) {
        const atualizado = await this.repository.atualizarPrato(id, data);
        if (atualizado) {
            await this.interacoesServices.adicionarInteracao({ idUsuario: data.idUsuario!, cardapioId: data.idCardapio!, motivo: MotivoInteracao.ALTERACAO })
        }
        return atualizado;
    }

    async deletarPrato(id: number) {
        return await this.repository.deletarPrato(id);
    }

}