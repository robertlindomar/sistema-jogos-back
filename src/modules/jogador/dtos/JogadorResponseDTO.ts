export interface JogadorResponseDTO {
    id: number;
    nome: string;
    rm: string;
    curso_id: number;
    curso?: {
        id: number;
        nome: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export class JogadorResponseDTOImpl implements JogadorResponseDTO {
    id: number;
    nome: string;
    rm: string;
    curso_id: number;
    curso?: {
        id: number;
        nome: string;
    };
    createdAt: Date;
    updatedAt: Date;

    constructor(data: any) {
        this.id = data.id;
        this.nome = data.nome;
        this.rm = data.rm;
        this.curso_id = data.curso_id;
        if (data.curso) {
            this.curso = {
                id: data.curso.id,
                nome: data.curso.nome,
            };
        }
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

