import React, { useState, useEffect } from "react";
import service from "../Appwrite/dataConf";
import PostCard from "../Components/PostCard";
import Container from "../Components/Container/Container";
import authService from "../Appwrite/auth";
import NoPost from "../Components/NoPost";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // Track the user state
  const [loading, setLoading] = useState(true); // Track loading state
  const userStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Check if the user is authenticated before fetching posts
    const checkAuthentication = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          // Fetch posts only if a user is authenticated
          fetchPosts();
        } else {
          setLoading(false); // End loading if no user is authenticated
        }
      } catch (error) {
        console.error("Authenticaion check failed:", error);
        setLoading(false);
      }
    };

    if (userStatus) {
      checkAuthentication();
    } else {
      setLoading(false); // End loading if user status is not authenticated
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const postsData = await service.getAllPosts([]);
      setPosts(postsData.documents);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false); // End loading regardless of success/failure
    }
  };

  // Display a loading state while checking authentication or fetching posts
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></div>
      </div>
    );
  }

  // Show message for unauthenticated users
  if (!user) {
    return <NoPost>Login or SignUp to Read Posts.</NoPost>;
  }

  // Show message if no posts are found
  if (posts.length === 0) {
    return <NoPost>No Posts Found.</NoPost>;
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
