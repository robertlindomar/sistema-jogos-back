import prisma from "../../../prisma";
import { AppError } from "../../../shared/errors/AppError";
import { PaginationParams } from "../../../shared/interfaces/PaginationParams";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { CursoRequestDTOImpl } from "../dtos/CursoRequestDTO";
import { CursoUpdateDTOImpl } from "../dtos/CursoUpdateDTO";
import { CursoModel } from "../models/CursoModel";

export class CursoRepository {
    async createCurso(curso: CursoRequestDTOImpl): Promise<CursoModel> {
        const nomeExistente = await prisma.curso.findFirst({
            where: { nome: curso.nome },
        });

        if (nomeExistente) {
            throw new AppError("Já existe um curso com este nome", 400);
        }

        const createdCurso = await prisma.curso.create({
            data: curso.dataToPrisma(),
        });

        return CursoModel.prismaToModel(createdCurso);
    }

    async findCursoById(id: number): Promise<CursoModel | null> {
        const curso = await prisma.curso.findUnique({
            where: { id },
        });

        if (!curso) {
            return null;
        }

        return CursoModel.prismaToModel(curso);
    }

    async listCursosPaginated(
        params: PaginationParams
    ): Promise<PaginationResponse<CursoModel>> {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (params.search) {
            where.nome = {
                contains: params.search,
            };
        }

        const [cursos, total] = await Promise.all([
            prisma.curso.findMany({
                where,
                skip,
                take: limit,
                orderBy: { id: "desc" },
            }),
            prisma.curso.count({ where }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: cursos.map((curso) => CursoModel.prismaToModel(curso)),
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

    async updateCurso(
        id: number,
        cursoData: CursoUpdateDTOImpl
    ): Promise<CursoModel> {
        const cursoExistente = await prisma.curso.findUnique({
            where: { id },
        });

        if (!cursoExistente) {
            throw new AppError("Curso não encontrado", 404);
        }

        if (cursoData.nome) {
            const nomeExistente = await prisma.curso.findFirst({
                where: {
                    nome: cursoData.nome,
                    NOT: { id },
                },
            });

            if (nomeExistente) {
                throw new AppError("Já existe um curso com este nome", 400);
            }
        }

        const updatedCurso = await prisma.curso.update({
            where: { id },
            data: cursoData.dataToPrisma(),
        });

        return CursoModel.prismaToModel(updatedCurso);
    }

    async deleteCurso(id: number): Promise<void> {
        const curso = await prisma.curso.findUnique({
            where: { id },
            include: {
                jogadores: true,
                times: true,
            },
        });

        if (!curso) {
            throw new AppError("Curso não encontrado", 404);
        }

        if (curso.jogadores.length > 0) {
            throw new AppError(
                "Não é possível excluir um curso que possui jogadores cadastrados",
                400
            );
        }

        if (curso.times.length > 0) {
            throw new AppError(
                "Não é possível excluir um curso que possui times cadastrados",
                400
            );
        }

        await prisma.curso.delete({
            where: { id },
        });
    }

    async listAllCursos(): Promise<CursoModel[]> {
        const cursos = await prisma.curso.findMany({
            orderBy: { nome: "asc" },
        });

        return cursos.map((curso) => CursoModel.prismaToModel(curso));
    }
}

