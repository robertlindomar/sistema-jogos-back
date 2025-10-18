// utils/gerarToken.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "minha-chave-secreta";

export function gerarToken(usuario: { id: number }): string {
    const id = usuario.id;


    return jwt.sign({ id }, JWT_SECRET,
        { expiresIn: "1d" });
}

