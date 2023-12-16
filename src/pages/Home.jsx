import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const loggedIn = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);
  // const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-10 mt-8 text-center inline-block">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-6 w-full">
              <h1 className="text-2xl font-bold font-mono hover:text-gray-800">
                {loggedIn
                  ? "Nothing to show here, you can add new blogs!"
                  : "Login/Signup to read posts ..!"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            return (
              <div key={post.$id} className="px-3 w-1/4">
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
