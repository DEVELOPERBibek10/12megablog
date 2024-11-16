import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../Appwrite/dataConf";
import Button from "../Components/Button";
import Container from "../Components/Container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loading from "../Components/Loading";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); // Get user data from Redux
  const status = useSelector((state) => state.auth.status); // Get user status from Redux
  const [isAuthor, setIsAuthor] = useState(false); // Local state to track if user is author

  useEffect(() => {
    // Fetch post data when slug changes
    const fetchPost = async () => {
      if (slug) {
        try {
          const fetchedPost = await service.getPost(slug);
          if (fetchedPost) {
            setPost(fetchedPost);
          }
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      } else {
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate]);

  useEffect(() => {
    // Check if the user is the author of the post whenever post or userData changes
    if (post && userData) {
      setIsAuthor(post.userId === userData.$id);
    }
  }, [post, userData]); // Dependency array includes post and userData

  const deletePost = async () => {
    const success = await service.deletePost(post.$id);
    if (success) {
      if (post.featuredImage) {
        service.deleteFile(post.featuredImage);
      }
      navigate("/");
    }
  };

  if (post) {
    return (
      <div className="py-8">
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={service.getFilePreview(post.featuredImage)}
              height={300}
              width={300}
              alt={post.title}
              className="rounded-xl"
            />
            {isAuthor && status ? (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            ) : null}
          </div>
          <div className="w-full p-4 border my-4 rounded-xl">
            <h1 className="text-3xl font-bold my-3 text-center">
              {post.title}
            </h1>
            <div className="browser-css w-full ">{parse(post.content)}</div>
          </div>
        </Container>
      </div>
    );
  } else {
    return <Loading />;
  }
}
