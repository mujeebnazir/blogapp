import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../store/postSlice";

export default function Post() {
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        dispatch(removePost(post));
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 border">
      <Container>
        <div className="flex justify-center mb-4 relative  rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded h-40"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500 font-mono text-xl"
                  className="mr-3"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 font-mono text-xl"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css text-xl text-left px-6">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
