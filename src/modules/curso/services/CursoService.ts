import { AppError } from "../../../shared/errors/AppError";
import { PaginationParams } from "../../../shared/interfaces/PaginationParams";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { CursoRequestDTO, CursoRequestDTOImpl } from "../dtos/CursoRequestDTO";
import { CursoResponseDTO } from "../dtos/CursoResponseDTO";
import { CursoUpdateDTO, CursoUpdateDTOImpl } from "../dtos/CursoUpdateDTO";
import { CursoRepository } from "../repositories/CursoRepository";

export class CursoService {
    private cursoRepository: CursoRepository;

    constructor() {
        this.cursoRepository = new CursoRepository();
    }

    async createCurso(cursoData: CursoRequestDTO): Promise<CursoResponseDTO> {
        const cursoDTO = new CursoRequestDTOImpl(cursoData);
        const curso = await this.cursoRepository.createCurso(cursoDTO);
        return curso.toResponse();
    }

    async getCursoById(id: number): Promise<CursoResponseDTO> {
        const curso = await this.cursoRepository.findCursoById(id);

        if (!curso) {
            throw new AppError("Curso não encontrado", 404);
        }

        return curso.toResponse();
    }

    async listCursosPaginated(
        params: PaginationParams
    ): Promise<PaginationResponse<CursoResponseDTO>> {
        const result = await this.cursoRepository.listCursosPaginated(params);

        return {
            data: result.data.map((curso) => curso.toResponse()),
            pagination: result.pagination,
        };
    }

    async updateCurso(
        id: number,
        cursoData: CursoUpdateDTO
    ): Promise<CursoResponseDTO> {
        const cursoDTO = new CursoUpdateDTOImpl(cursoData);
        const curso = await this.cursoRepository.updateCurso(id, cursoDTO);
        return curso.toResponse();
    }

    async deleteCurso(id: number): Promise<void> {
        await this.cursoRepository.deleteCurso(id);
    }

    async listAllCursos(): Promise<CursoResponseDTO[]> {
        const cursos = await this.cursoRepository.listAllCursos();
        return cursos.map((curso) => curso.toResponse());
    }
}

