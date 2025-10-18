import { UsuarioRequestDTO } from "../dtos/UsuarioRequestDTO";
import { UsuarioUpdateDTO } from "../dtos/UsuarioUpdateDTO";
import { UsuarioResponseDTO } from "../dtos/UsuarioResponseDTO";

export class UsuarioModel {
    constructor(
        public id: number,
        public nome: string,
        public email: string,
        public senha: string,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }

    static vazio(): UsuarioModel {
        return new UsuarioModel(0, '', '', '');
    }

    static dtos(dto: UsuarioRequestDTO): UsuarioModel {
        return new UsuarioModel(
            0,
            dto.nome,
            dto.email,
            dto.senha
        );
    }

    static updateDtos(dto: UsuarioUpdateDTO): any {
        const updateData: any = {};

        if (dto.nome !== undefined) updateData.nome = dto.nome;
        if (dto.email !== undefined) updateData.email = dto.email;
        if (dto.senha !== undefined) updateData.senha = dto.senha;

        return updateData;
    }
    static prismaParaModel(data: any): UsuarioModel {
        return new UsuarioModel(data.id, data.nome, data.email, data.senha, data.createdAt, data.updatedAt);
    }

    dataParaPrisma() {
        return {
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            createdAt: this.createdAt,
        };
    }

    toResponse(): UsuarioResponseDTO {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            createdAt: this.createdAt?.toISOString?.() || new Date().toISOString(),
            updatedAt: this.updatedAt?.toISOString?.() || new Date().toISOString(),
        };
    }



}