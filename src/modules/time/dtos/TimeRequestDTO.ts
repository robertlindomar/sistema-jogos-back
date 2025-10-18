export interface TimeRequestDTO {
    nome: string;
    jogador1_id: number;
    jogador2_id: number;
    suporte_id: number;
    curso_id: number;
    cadastrado_por: string;
}

export class TimeRequestDTOImpl implements TimeRequestDTO {
    nome: string;
    jogador1_id: number;
    jogador2_id: number;
    suporte_id: number;
    curso_id: number;
    cadastrado_por: string;

    constructor(data: any) {
        this.nome = data.nome?.trim();
        this.jogador1_id = Number(data.jogador1_id);
        this.jogador2_id = Number(data.jogador2_id);
        this.suporte_id = Number(data.suporte_id);
        this.curso_id = Number(data.curso_id);
        this.cadastrado_por = data.cadastrado_por?.trim();
    }

    dataToPrisma() {
        return {
            nome: this.nome,
            jogador1_id: this.jogador1_id,
            jogador2_id: this.jogador2_id,
            suporte_id: this.suporte_id,
            curso_id: this.curso_id,
            cadastrado_por: this.cadastrado_por,
        };
    }
}

