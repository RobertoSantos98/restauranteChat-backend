import { CardapioRepository } from "../../infrastructure/repositories/CardapioRepository";
import { interacoesService } from "./InteracoesService";


export class CardapioService {
    private repository = new CardapioRepository();
    private interacoesService = new interacoesService()

    async criarCardapio(data: {nome: string}){
        return await this.repository.criarCardapio(data);
    }

    async buscarTodos(){
        return await this.repository.buscarTodos();
    }

    async buscarCardapio(id: number){
        return await this.repository.buscarCardapio(id);
    }

    async buscarCardapioPorData(data: Date){
        return await this.repository.buscarPorData(data);
    }

    async atualizarCardapio(id: number, data: Partial<{nome: string, idUsuario: number ,interacao: string}>){

        const encontrado = await this.buscarCardapio(id);
        if(!encontrado) throw new Error("Não existe esse Cardápio");

        await this.interacoesService.adicionarInteracao({idUsuario: data.idUsuario!, cardapioId: encontrado.id, descricao: data.interacao!})        

        return await this.repository.atualizarCardapio(id, data);
    }

    async removerCardapio(id: number){
        return await this.repository.deletarCardapio(id);
    }

}