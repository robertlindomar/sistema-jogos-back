export interface TimeUpdateDTO {
    nome?: string;
    jogador1_id?: number;
    jogador2_id?: number;
    suporte_id?: number;
    curso_id?: number;
}

export class TimeUpdateDTOImpl implements TimeUpdateDTO {
    nome?: string;
    jogador1_id?: number;
    jogador2_id?: number;
    suporte_id?: number;
    curso_id?: number;

    constructor(data: any) {
        if (data.nome !== undefined) {
            this.nome = data.nome?.trim();
        }
        if (data.jogador1_id !== undefined) {
            this.jogador1_id = Number(data.jogador1_id);
        }
        if (data.jogador2_id !== undefined) {
            this.jogador2_id = Number(data.jogador2_id);
        }
        if (data.suporte_id !== undefined) {
            this.suporte_id = Number(data.suporte_id);
        }
        if (data.curso_id !== undefined) {
            this.curso_id = Number(data.curso_id);
        }
    }

    dataToPrisma() {
        const updateData: any = {};
        if (this.nome !== undefined) {
            updateData.nome = this.nome;
        }
        if (this.jogador1_id !== undefined) {
            updateData.jogador1_id = this.jogador1_id;
        }
        if (this.jogador2_id !== undefined) {
            updateData.jogador2_id = this.jogador2_id;
        }
        if (this.suporte_id !== undefined) {
            updateData.suporte_id = this.suporte_id;
        }
        if (this.curso_id !== undefined) {
            updateData.curso_id = this.curso_id;
        }
        return updateData;
    }
}

