import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function criptografarSenha(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}


export async function verificarSenha(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
