import prisma from "../../../prisma";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationParams } from "../../../shared/interfaces/PaginationParams";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { JogadorRequestDTOImpl } from "../dtos/JogadorRequestDTO";
import { JogadorUpdateDTOImpl } from "../dtos/JogadorUpdateDTO";
import { JogadorModel } from "../models/JogadorModel";

export class JogadorRepository {
    async createJogador(jogador: JogadorRequestDTOImpl): Promise<JogadorModel> {
        const rmExistente = await prisma.jogador.findUnique({
            where: { rm: jogador.rm },
        });

        if (rmExistente) {
            throw new AppError("Já existe um jogador com este RM", 400);
        }

        const cursoExiste = await prisma.curso.findUnique({
            where: { id: jogador.curso_id },
        });

        if (!cursoExiste) {
            throw new AppError("Curso não encontrado", 404);
        }

        const createdJogador = await prisma.jogador.create({
            data: jogador.dataToPrisma(),
            include: {
                curso: true,
            },
        });

        return JogadorModel.prismaToModel(createdJogador);
    }

    async findJogadorById(id: number): Promise<JogadorModel | null> {
        const jogador = await prisma.jogador.findUnique({
            where: { id },
            include: {
                curso: true,
            },
        });

        if (!jogador) {
            return null;
        }

        return JogadorModel.prismaToModel(jogador);
    }

    async findJogadorByRM(rm: string): Promise<JogadorModel | null> {
        const jogador = await prisma.jogador.findUnique({
            where: { rm },
            include: {
                curso: true,
            },
        });

        if (!jogador) {
            return null;
        }

        return JogadorModel.prismaToModel(jogador);
    }

    async listJogadoresPaginated(
        params: PaginationParams & { curso_id?: number }
    ): Promise<PaginationResponse<JogadorModel>> {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (params.search) {
            where.OR = [
                {
                    nome: {
                        contains: params.search,
                    },
                },
                {
                    rm: {
                        contains: params.search,
                    },
                },
            ];
        }

        if (params.curso_id) {
            where.curso_id = params.curso_id;
        }

        const [jogadores, total] = await Promise.all([
            prisma.jogador.findMany({
                where,
                skip,
                take: limit,
                orderBy: { id: "desc" },
                include: {
                    curso: true,
                },
            }),
            prisma.jogador.count({ where }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: jogadores.map((jogador) => JogadorModel.prismaToModel(jogador)),
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }

    async updateJogador(
        id: number,
        jogadorData: JogadorUpdateDTOImpl
    ): Promise<JogadorModel> {
        const jogadorExistente = await prisma.jogador.findUnique({
            where: { id },
        });

        if (!jogadorExistente) {
            throw new AppError("Jogador não encontrado", 404);
        }

        if (jogadorData.rm) {
            const rmExistente = await prisma.jogador.findFirst({
                where: {
                    rm: jogadorData.rm,
                    NOT: { id },
                },
            });

            if (rmExistente) {
                throw new AppError("Já existe um jogador com este RM", 400);
            }
        }

        if (jogadorData.curso_id) {
            const cursoExiste = await prisma.curso.findUnique({
                where: { id: jogadorData.curso_id },
            });

            if (!cursoExiste) {
                throw new AppError("Curso não encontrado", 404);
            }
        }

        const updatedJogador = await prisma.jogador.update({
            where: { id },
            data: jogadorData.dataToPrisma(),
            include: {
                curso: true,
            },
        });

        return JogadorModel.prismaToModel(updatedJogador);
    }

    async deleteJogador(id: number): Promise<void> {
        const jogador = await prisma.jogador.findUnique({
            where: { id },
            include: {
                timesComoJogador1: true,
                timesComoJogador2: true,
                timesComoSuporte: true,
            },
        });

        if (!jogador) {
            throw new AppError("Jogador não encontrado", 404);
        }

        const totalTimes =
            jogador.timesComoJogador1.length +
            jogador.timesComoJogador2.length +
            jogador.timesComoSuporte.length;

        if (totalTimes > 0) {
            throw new AppError(
                "Não é possível excluir um jogador que está vinculado a times",
                400
            );
        }

        await prisma.jogador.delete({
            where: { id },
        });
    }

    async listJogadoresByCurso(curso_id: number): Promise<JogadorModel[]> {
        const jogadores = await prisma.jogador.findMany({
            where: { curso_id },
            orderBy: { nome: "asc" },
            include: {
                curso: true,
            },
        });

        return jogadores.map((jogador) => JogadorModel.prismaToModel(jogador));
    }
}

