import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from '../api/posts';
import { useAuth } from '../hooks/useAuth';

type Post = {
    id: number;
    title: string;
    content: string;
};

const PostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
  
    useEffect(() => {
      const loadPosts = async () => {
        const data = await fetchPosts();
        setPosts(data);
      };

      loadPosts();
    }, []);

    return (
        <div>
          <h1>Posts</h1>
          <button onClick={() => {
        handleLogout();
        navigate('/');   
      }}>
        Voltar para Home
      </button>
          <ul>
            {posts.length === 0 ? (
              <p>Nenhum post encontrado.</p>
            ) : (
              posts.map((post) => (
                <li key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      );
    };
    
    export default PostsPage;