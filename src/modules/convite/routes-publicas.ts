import { Router, Request, Response, NextFunction } from "express";
import { TimeService } from "../time/services/TimeService";
import { JogadorService } from "../jogador/services/JogadorService";
import { ConviteService } from "./services/ConviteService";

const router = Router();
const timeService = new TimeService();
const jogadorService = new JogadorService();
const conviteService = new ConviteService();

// Middleware para validar token de convite
const validarTokenConvite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { token } = req.body;

        if (!token) {
            res.status(400).json({
                erro: "Token do convite é obrigatório"
            });
            return;
        }

        const validacao = await conviteService.validarConvite(token);

        if (!validacao.valido) {
            res.status(400).json({
                erro: validacao.mensagem || "Token de convite inválido"
            });
            return;
        }

        // Adicionar informações do convite ao request
        req.conviteData = {
            curso_id: validacao.curso?.id,
            curso_nome: validacao.curso?.nome
        };

        next();
    } catch (error: any) {
        res.status(500).json({
            erro: "Erro ao validar token do convite"
        });
    }
};

// Rota pública para buscar jogadores por curso (via token de convite)
router.get("/jogadores/:token", async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.params;

        // Validar o token do convite
        const validacao = await conviteService.validarConvite(token);

        if (!validacao.valido || !validacao.curso) {
            res.status(400).json({
                erro: validacao.mensagem || "Token de convite inválido"
            });
            return;
        }

        // Buscar jogadores do curso
        const jogadores = await jogadorService.listJogadoresByCurso(validacao.curso.id);
        res.json(jogadores);
    } catch (error: any) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Erro ao buscar jogadores",
        });
    }
});

// Rota pública para criar jogador via convite
router.post("/jogador", validarTokenConvite, async (req: Request, res: Response): Promise<void> => {
    try {
        // Adicionar curso_id do convite ao body
        const jogadorData = {
            ...req.body,
            curso_id: req.conviteData!.curso_id
        };

        const jogador = await jogadorService.createJogador(jogadorData);
        res.status(201).json(jogador);
    } catch (error: any) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Erro ao criar jogador",
        });
    }
});

// Rota pública para criar time via convite (com RMs)
router.post("/time", validarTokenConvite, async (req: Request, res: Response): Promise<void> => {
    try {
        // Adicionar curso_id do convite ao body
        const timeData = {
            ...req.body,
            curso_id: req.conviteData!.curso_id
        };

        const time = await timeService.createTimeByRM(timeData);
        res.status(201).json(time);
    } catch (error: any) {
        res.status(error.statusCode || 500).json({
            message: error.message || "Erro ao criar time",
        });
    }
});

export default router;

