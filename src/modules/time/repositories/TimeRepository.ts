import prisma from "../../../prisma";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationParams } from "../../../shared/interfaces/PaginationParams";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { TimeRequestDTOImpl } from "../dtos/TimeRequestDTO";
import { TimeUpdateDTOImpl } from "../dtos/TimeUpdateDTO";
import { TimeModel } from "../models/TimeModel";

export class TimeRepository {
    async createTime(time: TimeRequestDTOImpl): Promise<TimeModel> {
        // Validar se o curso existe
        const cursoExiste = await prisma.curso.findUnique({
            where: { id: time.curso_id },
        });

        if (!cursoExiste) {
            throw new AppError("Curso não encontrado", 404);
        }

        // Validar se os jogadores existem
        const [jogador1, jogador2, suporte] = await Promise.all([
            prisma.jogador.findUnique({ where: { id: time.jogador1_id } }),
            prisma.jogador.findUnique({ where: { id: time.jogador2_id } }),
            prisma.jogador.findUnique({ where: { id: time.suporte_id } }),
        ]);

        if (!jogador1) {
            throw new AppError("Jogador 1 não encontrado", 404);
        }

        if (!jogador2) {
            throw new AppError("Jogador 2 não encontrado", 404);
        }

        if (!suporte) {
            throw new AppError("Suporte não encontrado", 404);
        }

        // Validar se todos os jogadores são do mesmo curso
        if (jogador1.curso_id !== time.curso_id) {
            throw new AppError("Jogador 1 não pertence ao curso informado", 400);
        }

        if (jogador2.curso_id !== time.curso_id) {
            throw new AppError("Jogador 2 não pertence ao curso informado", 400);
        }

        if (suporte.curso_id !== time.curso_id) {
            throw new AppError("Suporte não pertence ao curso informado", 400);
        }

        // Validar se já existe um time com o mesmo nome
        const nomeExistente = await prisma.time.findFirst({
            where: { nome: time.nome },
        });

        if (nomeExistente) {
            throw new AppError("Já existe um time com este nome", 400);
        }

        const createdTime = await prisma.time.create({
            data: time.dataToPrisma(),
            include: {
                curso: true,
                jogador1: true,
                jogador2: true,
                suporte: true,
            },
        });

        return TimeModel.prismaToModel(createdTime);
    }

    async findTimeById(id: number): Promise<TimeModel | null> {
        const time = await prisma.time.findUnique({
            where: { id },
            include: {
                curso: true,
                jogador1: true,
                jogador2: true,
                suporte: true,
            },
        });

        if (!time) {
            return null;
        }

        return TimeModel.prismaToModel(time);
    }

    async listTimesPaginated(
        params: PaginationParams & { curso_id?: number }
    ): Promise<PaginationResponse<TimeModel>> {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (params.search) {
            where.nome = {
                contains: params.search,
            };
        }

        if (params.curso_id) {
            where.curso_id = params.curso_id;
        }

        const [times, total] = await Promise.all([
            prisma.time.findMany({
                where,
                skip,
                take: limit,
                orderBy: { id: "desc" },
                include: {
                    curso: true,
                    jogador1: true,
                    jogador2: true,
                    suporte: true,
                },
            }),
            prisma.time.count({ where }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: times.map((time) => TimeModel.prismaToModel(time)),
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

    async updateTime(id: number, timeData: TimeUpdateDTOImpl): Promise<TimeModel> {
        const timeExistente = await prisma.time.findUnique({
            where: { id },
        });

        if (!timeExistente) {
            throw new AppError("Time não encontrado", 404);
        }

        // Se está atualizando o nome, verificar se já existe
        if (timeData.nome) {
            const nomeExistente = await prisma.time.findFirst({
                where: {
                    nome: timeData.nome,
                    NOT: { id },
                },
            });

            if (nomeExistente) {
                throw new AppError("Já existe um time com este nome", 400);
            }
        }

        // Se está atualizando o curso, validar
        if (timeData.curso_id) {
            const cursoExiste = await prisma.curso.findUnique({
                where: { id: timeData.curso_id },
            });

            if (!cursoExiste) {
                throw new AppError("Curso não encontrado", 404);
            }
        }

        // Validar jogadores se estiverem sendo atualizados
        const jogadorIds = [];
        if (timeData.jogador1_id) jogadorIds.push(timeData.jogador1_id);
        if (timeData.jogador2_id) jogadorIds.push(timeData.jogador2_id);
        if (timeData.suporte_id) jogadorIds.push(timeData.suporte_id);

        if (jogadorIds.length > 0) {
            const jogadores = await prisma.jogador.findMany({
                where: { id: { in: jogadorIds } },
            });

            if (jogadores.length !== jogadorIds.length) {
                throw new AppError("Um ou mais jogadores não foram encontrados", 404);
            }

            // Verificar se todos os jogadores pertencem ao curso
            const cursoId = timeData.curso_id || timeExistente.curso_id;
            const jogadorDiferenteCurso = jogadores.find(
                (j) => j.curso_id !== cursoId
            );

            if (jogadorDiferenteCurso) {
                throw new AppError(
                    "Todos os jogadores devem pertencer ao mesmo curso do time",
                    400
                );
            }
        }

        const updatedTime = await prisma.time.update({
            where: { id },
            data: timeData.dataToPrisma(),
            include: {
                curso: true,
                jogador1: true,
                jogador2: true,
                suporte: true,
            },
        });

        return TimeModel.prismaToModel(updatedTime);
    }

    async deleteTime(id: number): Promise<void> {
        const time = await prisma.time.findUnique({
            where: { id },
        });

        if (!time) {
            throw new AppError("Time não encontrado", 404);
        }

        await prisma.time.delete({
            where: { id },
        });
    }

    async listTimesByCurso(curso_id: number): Promise<TimeModel[]> {
        const times = await prisma.time.findMany({
            where: { curso_id },
            orderBy: { nome: "asc" },
            include: {
                curso: true,
                jogador1: true,
                jogador2: true,
                suporte: true,
            },
        });

        return times.map((time) => TimeModel.prismaToModel(time));
    }
}

