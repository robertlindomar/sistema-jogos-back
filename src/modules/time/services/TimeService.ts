import { AppError } from "../../../shared/errors/AppError";
import { PaginationParams } from "../../../shared/interfaces/PaginationParams";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import { TimeRequestDTO, TimeRequestDTOImpl } from "../dtos/TimeRequestDTO";
import { TimeConviteRequestDTO, TimeConviteRequestDTOImpl } from "../dtos/TimeConviteRequestDTO";
import { TimeResponseDTO } from "../dtos/TimeResponseDTO";
import { TimeUpdateDTO, TimeUpdateDTOImpl } from "../dtos/TimeUpdateDTO";
import { TimeRepository } from "../repositories/TimeRepository";
import { JogadorRepository } from "../../jogador/repositories/JogadorRepository";

export class TimeService {
    private timeRepository: TimeRepository;
    private jogadorRepository: JogadorRepository;

    constructor() {
        this.timeRepository = new TimeRepository();
        this.jogadorRepository = new JogadorRepository();
    }

    async createTime(timeData: TimeRequestDTO): Promise<TimeResponseDTO> {
        const timeDTO = new TimeRequestDTOImpl(timeData);
        const time = await this.timeRepository.createTime(timeDTO);
        return time.toResponse();
    }

    async getTimeById(id: number): Promise<TimeResponseDTO> {
        const time = await this.timeRepository.findTimeById(id);

        if (!time) {
            throw new AppError("Time não encontrado", 404);
        }

        return time.toResponse();
    }

    async listTimesPaginated(
        params: PaginationParams & { curso_id?: number }
    ): Promise<PaginationResponse<TimeResponseDTO>> {
        const result = await this.timeRepository.listTimesPaginated(params);

        return {
            data: result.data.map((time) => time.toResponse()),
            pagination: result.pagination,
        };
    }

    async updateTime(
        id: number,
        timeData: TimeUpdateDTO
    ): Promise<TimeResponseDTO> {
        const timeDTO = new TimeUpdateDTOImpl(timeData);
        const time = await this.timeRepository.updateTime(id, timeDTO);
        return time.toResponse();
    }

    async deleteTime(id: number): Promise<void> {
        await this.timeRepository.deleteTime(id);
    }

    async listTimesByCurso(curso_id: number): Promise<TimeResponseDTO[]> {
        const times = await this.timeRepository.listTimesByCurso(curso_id);
        return times.map((time) => time.toResponse());
    }

    async createTimeByRM(timeData: TimeConviteRequestDTO): Promise<TimeResponseDTO> {
        const timeDTO = new TimeConviteRequestDTOImpl(timeData);

        // Buscar jogadores por RM
        const jogadores = await Promise.all([
            this.jogadorRepository.findJogadorByRM(timeDTO.jogador1_rm),
            this.jogadorRepository.findJogadorByRM(timeDTO.jogador2_rm),
            this.jogadorRepository.findJogadorByRM(timeDTO.suporte_rm),
        ]);

        const [jogador1, jogador2, suporte] = jogadores;

        if (!jogador1) {
            throw new AppError(`Jogador 1 com RM ${timeDTO.jogador1_rm} não encontrado`, 404);
        }

        if (!jogador2) {
            throw new AppError(`Jogador 2 com RM ${timeDTO.jogador2_rm} não encontrado`, 404);
        }

        if (!suporte) {
            throw new AppError(`Suporte com RM ${timeDTO.suporte_rm} não encontrado`, 404);
        }

        // Verificar se todos os jogadores são do mesmo curso
        if (jogador1.curso_id !== timeDTO.curso_id) {
            throw new AppError("Jogador 1 não pertence ao curso informado", 400);
        }

        if (jogador2.curso_id !== timeDTO.curso_id) {
            throw new AppError("Jogador 2 não pertence ao curso informado", 400);
        }

        if (suporte.curso_id !== timeDTO.curso_id) {
            throw new AppError("Suporte não pertence ao curso informado", 400);
        }

        // Criar time com os IDs dos jogadores
        const timeRequestDTO = new TimeRequestDTOImpl({
            nome: timeDTO.nome,
            jogador1_id: jogador1.id,
            jogador2_id: jogador2.id,
            suporte_id: suporte.id,
            curso_id: timeDTO.curso_id,
            cadastrado_por: timeDTO.cadastrado_por,
        });

        const time = await this.timeRepository.createTime(timeRequestDTO);
        return time.toResponse();
    }
}

