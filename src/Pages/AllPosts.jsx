import React, { useState, useEffect } from "react";
import service from "../Appwrite/dataConf";
import Container from "../Components/Container/Container";
import PostCard from "../Components/PostCard";
import NoPost from "../Components/NoPost";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    service.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return <NoPost>No posts found.</NoPost>;
  } else {
    return (
      <>
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
      </>
    );
  }
}

export default AllPosts;
