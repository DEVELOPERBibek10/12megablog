import React from "react";
import Container from "../Components/Container/Container.jsx";
import PostForm from "../Components/Post/PostForm";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
