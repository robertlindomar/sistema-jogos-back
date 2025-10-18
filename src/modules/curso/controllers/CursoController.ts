import { Request, Response, NextFunction } from "express";
import { CursoService } from "../services/CursoService";

export class CursoController {
    private cursoService: CursoService;

    constructor() {
        this.cursoService = new CursoService();
    }

    async createCurso(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const curso = await this.cursoService.createCurso(req.body);
            return res.status(201).json(curso);
        } catch (error) {
            next(error);
        }
    }

    async getCursoById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = Number(req.params.id);
            const curso = await this.cursoService.getCursoById(id);
            return res.status(200).json(curso);
        } catch (error) {
            next(error);
        }
    }

    async listCursosPaginated(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const { page, limit, search } = req.query;
            const cursos = await this.cursoService.listCursosPaginated({
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                search: search as string,
            });
            return res.status(200).json(cursos);
        } catch (error) {
            next(error);
        }
    }

    async updateCurso(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = Number(req.params.id);
            console.log(Number(req.params.id));
            const curso = await this.cursoService.updateCurso(id, req.body);
            return res.status(200).json(curso);
        } catch (error) {
            next(error);
        }
    }

    async deleteCurso(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.cursoService.deleteCurso(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async listAllCursos(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const cursos = await this.cursoService.listAllCursos();
            return res.status(200).json(cursos);
        } catch (error) {
            next(error);
        }
    }
}

