import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = 'seu_segredo_super_secreto';
const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ error: 'Please provide all fields' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User created', userId: newUser.id });

  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};
