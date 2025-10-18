import { Request, Response, NextFunction } from "express";
import { JogadorService } from "../services/JogadorService";

export class JogadorController {
    private jogadorService: JogadorService;

    constructor() {
        this.jogadorService = new JogadorService();
    }

    async createJogador(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const jogador = await this.jogadorService.createJogador(req.body);
            return res.status(201).json(jogador);
        } catch (error) {
            next(error);
        }
    }

    async getJogadorById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = Number(req.params.id);
            const jogador = await this.jogadorService.getJogadorById(id);
            return res.status(200).json(jogador);
        } catch (error) {
            next(error);
        }
    }

    async listJogadoresPaginated(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const { page, limit, search, curso_id } = req.query;
            const jogadores = await this.jogadorService.listJogadoresPaginated({
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                search: search as string,
                curso_id: curso_id ? Number(curso_id) : undefined,
            });
            return res.status(200).json(jogadores);
        } catch (error) {
            next(error);
        }
    }

    async updateJogador(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = Number(req.params.id);
            const jogador = await this.jogadorService.updateJogador(id, req.body);
            return res.status(200).json(jogador);
        } catch (error) {
            next(error);
        }
    }

    async deleteJogador(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.jogadorService.deleteJogador(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async listJogadoresByCurso(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const curso_id = Number(req.params.curso_id);
            const jogadores = await this.jogadorService.listJogadoresByCurso(
                curso_id
            );
            return res.status(200).json(jogadores);
        } catch (error) {
            next(error);
        }
    }
}

