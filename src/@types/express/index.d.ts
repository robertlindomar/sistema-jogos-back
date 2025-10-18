// src/@types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
            conviteData?: {
                curso_id?: number;
                curso_nome?: string;
            };
        }
    }
}
