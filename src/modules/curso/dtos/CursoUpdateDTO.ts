export interface CursoUpdateDTO {
    nome?: string;
}

export class CursoUpdateDTOImpl implements CursoUpdateDTO {
    nome?: string;

    constructor(data: any) {
        if (data.nome !== undefined) {
            this.nome = data.nome?.trim();
        }
    }

    dataToPrisma() {
        const updateData: any = {};
        if (this.nome !== undefined) {
            updateData.nome = this.nome;
        }
        return updateData;
    }
}

