import { PrismaClient } from "@prisma/client";
import { UsuarioRequestDTO } from "../dtos/UsuarioRequestDTO";
import { UsuarioUpdateDTO } from "../dtos/UsuarioUpdateDTO";
import { UsuarioModel } from "../models/UsuarioModel";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationQuery } from "../../../shared/interfaces/PaginationResponse";

const prisma = new PrismaClient();

export class UsuarioRepository {

    async criar(request: UsuarioRequestDTO): Promise<UsuarioModel> {
        const usuario = UsuarioModel.dtos(request);
        if (!usuario) {
            throw new AppError("Dados inválidos para criar usuário", 400);
        }

        const existente = await prisma.usuario.findFirst({
            where: { email: usuario.email },
        });
        if (existente) {
            throw new AppError("Usuário com este email já existe.", 409);
        }

        const novo = await prisma.usuario.create({
            data: usuario.dataParaPrisma(),
        });

        return UsuarioModel.prismaParaModel(novo);
    }

    async listar(pagination?: PaginationQuery): Promise<{ usuarios: UsuarioModel[], total: number }> {
        const [usuarios, total] = await Promise.all([
            prisma.usuario.findMany({
                skip: pagination?.skip,
                take: pagination?.limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.usuario.count()
        ]);

        return {
            usuarios: usuarios.map((u: any) => UsuarioModel.prismaParaModel(u)),
            total
        };
    }

    async buscarPorId(id: number): Promise<UsuarioModel> {
        if (!id) throw new AppError("ID é obrigatório", 400);
        const existente = await prisma.usuario.findUnique({ where: { id } });
        if (!existente) throw new AppError("Usuário não encontrado", 404);
        return UsuarioModel.prismaParaModel(existente);
    }

    async buscarPorEmail(email: string): Promise<UsuarioModel> {
        if (!email) throw new AppError("Email é obrigatório", 400);

        const existente = await prisma.usuario.findUnique({ where: { email } });

        if (!existente) throw new AppError("Usuário não encontrado", 404);

        return UsuarioModel.prismaParaModel(existente);
    }

    async atualizar(id: number, data: UsuarioUpdateDTO): Promise<UsuarioModel> {
        if (!id || !data) throw new AppError("ID e dados são obrigatórios", 400);

        const existente = await prisma.usuario.findUnique({ where: { id } });

        if (!existente) throw new AppError("Usuário não encontrado", 404);

        const atualizado = await prisma.usuario.update({
            where: { id },
            data: UsuarioModel.updateDtos(data),
        });
        return UsuarioModel.prismaParaModel(atualizado);
    }

    async deletar(id: number): Promise<UsuarioModel> {
        if (!id) throw new AppError("ID é obrigatório", 400);

        const existente = await prisma.usuario.findUnique({ where: { id } });

        if (!existente) throw new AppError("Usuário não encontrado", 404);

        const deletado = await prisma.usuario.delete({ where: { id } });

        return UsuarioModel.prismaParaModel(deletado);
    }

    // Buscar incluindo a senha
    async buscarUsuarioCompletoPorId(id: number): Promise<UsuarioModel> {

        if (!id) throw new AppError("ID é obrigatório", 400);

        const usuario = await prisma.usuario.findUnique({ where: { id } });

        if (!usuario) throw new AppError("Usuário não encontrado", 404);

        return UsuarioModel.prismaParaModel(usuario);
    }

    // Atualizar apenas a senha
    async atualizarSenha(id: number, novaSenha: string): Promise<void> {
        if (!id || !novaSenha) throw new AppError("ID e nova senha são obrigatórios", 400);

        const existente = await prisma.usuario.findUnique({ where: { id } });

        if (!existente) throw new AppError("Usuário não encontrado", 404);

        await prisma.usuario.update({
            where: { id },
            data: { senha: novaSenha },
        });
    }
}
