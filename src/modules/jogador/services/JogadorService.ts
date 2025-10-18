import { AppError } from "../../../shared/errors/AppError";
import { PaginationParams } from "../../../shared/interfaces/PaginationParams";
import { PaginationResponse } from "../../../shared/interfaces/PaginationResponse";
import {
    JogadorRequestDTO,
    JogadorRequestDTOImpl,
} from "../dtos/JogadorRequestDTO";
import { JogadorResponseDTO } from "../dtos/JogadorResponseDTO";
import {
    JogadorUpdateDTO,
    JogadorUpdateDTOImpl,
} from "../dtos/JogadorUpdateDTO";
import { JogadorRepository } from "../repositories/JogadorRepository";

export class JogadorService {
    private jogadorRepository: JogadorRepository;

    constructor() {
        this.jogadorRepository = new JogadorRepository();
    }

    async createJogador(
        jogadorData: JogadorRequestDTO
    ): Promise<JogadorResponseDTO> {
        const jogadorDTO = new JogadorRequestDTOImpl(jogadorData);
        const jogador = await this.jogadorRepository.createJogador(jogadorDTO);
        return jogador.toResponse();
    }

    async getJogadorById(id: number): Promise<JogadorResponseDTO> {
        const jogador = await this.jogadorRepository.findJogadorById(id);

        if (!jogador) {
            throw new AppError("Jogador não encontrado", 404);
        }

        return jogador.toResponse();
    }

    async listJogadoresPaginated(
        params: PaginationParams & { curso_id?: number }
    ): Promise<PaginationResponse<JogadorResponseDTO>> {
        const result = await this.jogadorRepository.listJogadoresPaginated(params);

        return {
            data: result.data.map((jogador) => jogador.toResponse()),
            pagination: result.pagination,
        };
    }

    async updateJogador(
        id: number,
        jogadorData: JogadorUpdateDTO
    ): Promise<JogadorResponseDTO> {
        const jogadorDTO = new JogadorUpdateDTOImpl(jogadorData);
        const jogador = await this.jogadorRepository.updateJogador(id, jogadorDTO);
        return jogador.toResponse();
    }

    async deleteJogador(id: number): Promise<void> {
        await this.jogadorRepository.deleteJogador(id);
    }

    async listJogadoresByCurso(curso_id: number): Promise<JogadorResponseDTO[]> {
        const jogadores = await this.jogadorRepository.listJogadoresByCurso(
            curso_id
        );
        return jogadores.map((jogador) => jogador.toResponse());
    }
}

