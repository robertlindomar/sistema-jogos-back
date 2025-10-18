import prisma from "../../../prisma";
import { AppError } from "../../../shared/errors/AppError";
import { ConviteRequestDTOImpl } from "../dtos/ConviteRequestDTO";
import { ConviteModel } from "../models/ConviteModel";
import crypto from "crypto";

export class ConviteRepository {
    async createConvite(
        conviteData: ConviteRequestDTOImpl,
        criado_por: number
    ): Promise<ConviteModel> {
        // Validar se o curso existe
        const cursoExiste = await prisma.curso.findUnique({
            where: { id: conviteData.curso_id },
        });

        if (!cursoExiste) {
            throw new AppError("Curso não encontrado", 404);
        }

        // Gerar token único
        const token = crypto.randomBytes(32).toString("hex");

        const convite = await prisma.convite.create({
            data: {
                ...conviteData.dataToPrisma(),
                token,
                criado_por,
            },
            include: {
                curso: true,
                usuario: true,
            },
        });

        return ConviteModel.prismaToModel(convite);
    }

    async findConviteByToken(token: string): Promise<ConviteModel | null> {
        const convite = await prisma.convite.findUnique({
            where: { token },
            include: {
                curso: true,
                usuario: true,
            },
        });

        if (!convite) {
            return null;
        }

        return ConviteModel.prismaToModel(convite);
    }

    async listConvitesByCurso(curso_id: number): Promise<ConviteModel[]> {
        const convites = await prisma.convite.findMany({
            where: { curso_id },
            include: {
                curso: true,
                usuario: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return convites.map((convite) => ConviteModel.prismaToModel(convite));
    }

    async listConvitesByUsuario(usuario_id: number): Promise<ConviteModel[]> {
        const convites = await prisma.convite.findMany({
            where: { criado_por: usuario_id },
            include: {
                curso: true,
                usuario: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return convites.map((convite) => ConviteModel.prismaToModel(convite));
    }

    async desativarConvite(id: number): Promise<ConviteModel> {
        const convite = await prisma.convite.update({
            where: { id },
            data: { ativo: false },
            include: {
                curso: true,
                usuario: true,
            },
        });

        return ConviteModel.prismaToModel(convite);
    }

    async deleteConvite(id: number): Promise<void> {
        await prisma.convite.delete({
            where: { id },
        });
    }
}

