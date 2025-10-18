export interface JogadorUpdateDTO {
    nome?: string;
    rm?: string;
    curso_id?: number;
}

export class JogadorUpdateDTOImpl implements JogadorUpdateDTO {
    nome?: string;
    rm?: string;
    curso_id?: number;

    constructor(data: any) {
        if (data.nome !== undefined) {
            this.nome = data.nome?.trim();
        }
        if (data.rm !== undefined) {
            this.rm = data.rm?.trim();
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
        if (this.rm !== undefined) {
            updateData.rm = this.rm;
        }
        if (this.curso_id !== undefined) {
            updateData.curso_id = this.curso_id;
        }
        return updateData;
    }
}

