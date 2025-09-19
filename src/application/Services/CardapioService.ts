import { CardapioRepository } from "../../infrastructure/repositories/CardapioRepository";
import { interacoesService } from "./InteracoesService";
import { MotivoInteracao } from "./InteracoesService";


export class CardapioService {
    private repository = new CardapioRepository();
    private interacoesService = new interacoesService()

    async criarCardapio(data: { nome: string, idUsuario: number }) {
        const criado = await this.repository.criarCardapio({ nome: data.nome});

        if(criado){
        await this.interacoesService.adicionarInteracao({idUsuario: data.idUsuario, cardapioId: criado.id, motivo: MotivoInteracao.CRIACAO})
        }

        return criado
    }

    async buscarTodos() {
        return await this.repository.buscarTodos();
    }

    async buscarCardapio(id: number) {
        return await this.repository.buscarCardapio(id);
    }

    async buscarCardapioPorData(data: Date) {
        return await this.repository.buscarPorData(data);
    }

    async atualizarCardapio(id: number, data: Partial<{ nome: string, idUsuario: number }>) {

        const encontrado = await this.buscarCardapio(id);
        if (!encontrado) throw new Error("Não existe esse Cardápio");

        await this.interacoesService.adicionarInteracao({ idUsuario: data.idUsuario!, cardapioId: encontrado.id, motivo: MotivoInteracao.ALTERACAO})

        return await this.repository.atualizarCardapio(id, data);
    }

    async removerCardapio(id: number) {
        return await this.repository.deletarCardapio(id);
    }

}