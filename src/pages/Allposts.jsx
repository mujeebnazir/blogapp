import { useEffect, useState } from "react";
import React from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

function Allposts() {
  // const posts = useSelector((state) => state.post.posts);
  // const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

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

export default Allposts;
