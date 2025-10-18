export interface TimeConviteRequestDTO {
    nome: string;
    jogador1_rm: string;
    jogador2_rm: string;
    suporte_rm: string;
    curso_id: number;
    cadastrado_por: string;
}

export class TimeConviteRequestDTOImpl implements TimeConviteRequestDTO {
    nome: string;
    jogador1_rm: string;
    jogador2_rm: string;
    suporte_rm: string;
    curso_id: number;
    cadastrado_por: string;

    constructor(data: any) {
        this.nome = data.nome?.trim();
        this.jogador1_rm = data.jogador1_rm?.trim();
        this.jogador2_rm = data.jogador2_rm?.trim();
        this.suporte_rm = data.suporte_rm?.trim();
        this.curso_id = Number(data.curso_id);
        this.cadastrado_por = data.cadastrado_por?.trim();
    }
}

