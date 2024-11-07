import { PrismaClient } from '@prisma/client';
import { comparePassword, generateToken } from '../../../utils/auth';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Email ou senha incorretos' });
  
  const isValid = await comparePassword(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Email ou senha incorretos' });

  const token = generateToken(user);
  res.json({ token });
}
