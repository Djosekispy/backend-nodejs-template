import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env';

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
  sessionId: string;
}

async function getUserIdFromToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as CustomJwtPayload;
    req.params.id = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
}

export { getUserIdFromToken };