import { Request, Response } from "express";
import { ConviteService } from "../services/ConviteService";

export class ConviteController {
    private conviteService: ConviteService;

    constructor() {
        this.conviteService = new ConviteService();
    }

    criarConvite = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;

            if (!user || typeof user === "string" || !user.id) {
                res.status(401).json({ message: "Usuário não autenticado" });
                return;
            }

            const convite = await this.conviteService.criarConvite(req.body, user.id);
            res.status(201).json(convite);
        } catch (error: any) {
            console.error("Erro no controller:", error);
            res.status(error.statusCode || 500).json({
                message: error.message || "Erro interno do servidor"
            });
        }
    };

    validarConvite = async (req: Request, res: Response): Promise<void> => {
        const { token } = req.params;
        const resultado = await this.conviteService.validarConvite(token);
        res.json(resultado);
    };


    listarConvitesPorCurso = async (req: Request, res: Response): Promise<void> => {
        const { curso_id } = req.params;
        const convites = await this.conviteService.listarConvitesPorCurso(
            parseInt(curso_id)
        );
        res.json(convites);
    };

    listarMeusConvites = async (req: Request, res: Response): Promise<void> => {
        const user = req.user;

        if (!user || typeof user === "string" || !user.id) {
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }

        const convites = await this.conviteService.listarMeusConvites(user.id);
        res.json(convites);
    };

    desativarConvite = async (req: Request, res: Response): Promise<void> => {
        const user = req.user;
        const { id } = req.params;

        if (!user || typeof user === "string" || !user.id) {
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }

        await this.conviteService.desativarConvite(parseInt(id), user.id);
        res.json({ message: "Convite desativado com sucesso" });
    };

    excluirConvite = async (req: Request, res: Response): Promise<void> => {
        const user = req.user;
        const { id } = req.params;

        if (!user || typeof user === "string" || !user.id) {
            res.status(401).json({ message: "Usuário não autenticado" });
            return;
        }

        await this.conviteService.excluirConvite(parseInt(id), user.id);
        res.status(204).send();
    };
}

