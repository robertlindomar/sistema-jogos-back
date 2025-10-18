import { JogadorResponseDTO, JogadorResponseDTOImpl } from "../dtos/JogadorResponseDTO";

export class JogadorModel {
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

    static prismaToModel(prismaData: any): JogadorModel {
        return new JogadorModel({
            id: prismaData.id,
            nome: prismaData.nome,
            rm: prismaData.rm,
            curso_id: prismaData.curso_id,
            curso: prismaData.curso,
            createdAt: prismaData.createdAt,
            updatedAt: prismaData.updatedAt,
        });
    }

    toResponse(): JogadorResponseDTO {
        return new JogadorResponseDTOImpl({
            id: this.id,
            nome: this.nome,
            rm: this.rm,
            curso_id: this.curso_id,
            curso: this.curso,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        });
    }
}

