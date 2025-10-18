import { Request, Response, NextFunction } from "express";
import { TimeService } from "../services/TimeService";

export class TimeController {
    private timeService: TimeService;

    constructor() {
        this.timeService = new TimeService();
    }

    async createTime(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const time = await this.timeService.createTime(req.body);
            return res.status(201).json(time);
        } catch (error) {
            next(error);
        }
    }

    async getTimeById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = Number(req.params.id);
            const time = await this.timeService.getTimeById(id);
            return res.status(200).json(time);
        } catch (error) {
            next(error);
        }
    }

    async listTimesPaginated(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const { page, limit, search, curso_id } = req.query;
            const times = await this.timeService.listTimesPaginated({
                page: page ? Number(page) : undefined,
                limit: limit ? Number(limit) : undefined,
                search: search as string,
                curso_id: curso_id ? Number(curso_id) : undefined,
            });
            return res.status(200).json(times);
        } catch (error) {
            next(error);
        }
    }

    async updateTime(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = Number(req.params.id);
            const time = await this.timeService.updateTime(id, req.body);
            return res.status(200).json(time);
        } catch (error) {
            next(error);
        }
    }

    async deleteTime(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.timeService.deleteTime(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async listTimesByCurso(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const curso_id = Number(req.params.curso_id);
            const times = await this.timeService.listTimesByCurso(curso_id);
            return res.status(200).json(times);
        } catch (error) {
            next(error);
        }
    }
}

