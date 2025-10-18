import { AppError } from "../../../shared/errors/AppError";
import { ConviteRequestDTO, ConviteRequestDTOImpl } from "../dtos/ConviteRequestDTO";
import { ConviteResponseDTO, ConviteResponseDTOImpl } from "../dtos/ConviteResponseDTO";
import { ValidarConviteResponseDTO, ValidarConviteResponseDTOImpl } from "../dtos/ValidarConviteResponseDTO";
import { ConviteRepository } from "../repositories/ConviteRepository";

export class ConviteService {
    private conviteRepository: ConviteRepository;

    constructor() {
        this.conviteRepository = new ConviteRepository();
    }

    async criarConvite(
        conviteData: ConviteRequestDTO,
        criado_por: number
    ): Promise<ConviteResponseDTO> {
        try {
            console.log("Dados recebidos:", conviteData);
            console.log("Usuário criador:", criado_por);

            const conviteDTO = new ConviteRequestDTOImpl(conviteData);
            console.log("DTO criado:", conviteDTO);

            const convite = await this.conviteRepository.createConvite(
                conviteDTO,
                criado_por
            );
            console.log("Convite criado:", convite);

            const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";
            const response = new ConviteResponseDTOImpl(convite, frontendUrl);
            console.log("Response criada:", response);

            return response;
        } catch (error) {
            console.error("Erro ao criar convite:", error);
            throw error;
        }
    }

    async validarConvite(token: string): Promise<ValidarConviteResponseDTO> {
        const convite = await this.conviteRepository.findConviteByToken(token);

        if (!convite) {
            return new ValidarConviteResponseDTOImpl({
                valido: false,
                mensagem: "Convite não encontrado",
            });
        }

        if (!convite.ativo) {
            return new ValidarConviteResponseDTOImpl({
                valido: false,
                mensagem: "Convite inativo",
            });
        }

        if (new Date() > convite.expira_em) {
            return new ValidarConviteResponseDTOImpl({
                valido: false,
                mensagem: "Convite expirado",
            });
        }

        return new ValidarConviteResponseDTOImpl({
            valido: true,
            curso: {
                id: convite.curso?.id || convite.curso_id,
                nome: convite.curso?.nome || "",
            },
        });
    }

    async listarConvitesPorCurso(curso_id: number): Promise<ConviteResponseDTO[]> {
        const convites = await this.conviteRepository.listConvitesByCurso(curso_id);
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";

        return convites.map((convite) => new ConviteResponseDTOImpl(convite, frontendUrl));
    }

    async listarMeusConvites(usuario_id: number): Promise<ConviteResponseDTO[]> {
        const convites = await this.conviteRepository.listConvitesByUsuario(usuario_id);
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";

        return convites.map((convite) => new ConviteResponseDTOImpl(convite, frontendUrl));
    }

    async desativarConvite(id: number, usuario_id: number): Promise<void> {
        const convites = await this.conviteRepository.listConvitesByUsuario(usuario_id);
        const convite = convites.find((c) => c.id === id);

        if (!convite) {
            throw new AppError("Convite não encontrado ou sem permissão", 403);
        }

        await this.conviteRepository.desativarConvite(id);
    }

    async excluirConvite(id: number, usuario_id: number): Promise<void> {
        const convites = await this.conviteRepository.listConvitesByUsuario(usuario_id);
        const convite = convites.find((c) => c.id === id);

        if (!convite) {
            throw new AppError("Convite não encontrado ou sem permissão", 403);
        }

        await this.conviteRepository.deleteConvite(id);
    }
}

