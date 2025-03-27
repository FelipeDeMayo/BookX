import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient(); 

export const createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    let imageUrl = null;
    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
    }

    try { 
        const newPost = await prisma.post.create({
            data: {
                title,
                content: content || null,
                imageUrl,
                userId
            },
        });

        return res.status(201).json({ message: 'Post created successfully', postId: newPost.id });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { user: true },
        });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};  
