import React from "react";
import Container from "./Container/Container";
function NoPost({ children }) {
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <div className="flex justify-center mb-10">
              <img
                src="https://clipground.com/images/confused-person-clipart-13.jpg"
                alt=""
                width={400}
              />
            </div>
            <h1 className="text-3xl font-bold hover:text-gray-300">
              {children}
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NoPost;
