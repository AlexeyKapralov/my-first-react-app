import CreatePostForm from "./CreatePost/CreatePostForm";
import Post from "./Post/Post";
import { AboutProfileForm } from "./About/AboutProfileForm";
import { UserType } from "../../../redux/users-reducer";
import { PostType } from "../../../redux/profile-reducer";
import React from "react";
import { tGetProfile, tProfileData } from "../../../api/profile-api";

type PropsType = {
  addPost: (newPostText: string) => void;
  posts: Array<PostType>;
  userId: number;
  setNewProfileData: (data: tGetProfile) => Promise<void>;
  post: tGetProfile | undefined;
};

const Posts: React.FC<PropsType> = ({
  addPost,
  post,
  posts,
  userId,
  setNewProfileData,
}) => {
  let messageElements = posts.map((post) => {
    return <Post key={post.id} message={post.message} />;
  });

  return (
    <div>
      <div>
        <AboutProfileForm
          post={post}
          userId={userId}
          setNewProfileData={setNewProfileData}
        />
        <CreatePostForm addPost={addPost} />
      </div>
      {messageElements}
    </div>
  );
};

export default Posts;
