import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { PostType } from "../services/types";
import Post from "../components/Post";

export default function Profile() {
  const [allPosts, setAllPosts] = useState<PostType[]>([{
    hrDiff: "10",
    postText: "Hello world",
    postUserFirstName: "Oke Sodiq",
    postUsername: "Adedayoke",

  }]); // Array of posts

  return (
    <div className="grid grid-cols-[20rem_1fr_25rem] text-lg bg-[rgba(0,0,0)] text-white h-screen px-6">
      <Sidebar />
      <div className="border-[#3e4144] border-r-1">
        <h2 className="text-center py-3 text-xl border-b border-[#3e4144] flex flex-col gap-3">
          Profile
        </h2>
        <div className="px-3 py-5 border-b border-[#3e4144]">
          <h1 className="text-3xl font-semibold">Oke Habeeb Adedayo</h1>
        </div>
        {allPosts.length > 0 ? (
          allPosts.map((post, id) => (
            <Post
              hrDiff={post.hrDiff}
              postText={post.postText}
              postUserFirstName={post.postUserFirstName}
              imageUrl={post.imageUrl}
              postUsername={post.postUsername}
              key={id}
              showState={true}
            />
          ))
        ) : (
          <p className="text-center my-4">
            You dont have any post yet
          </p>
        )}
      </div>
      <div className="border-[#3e4144] px-3 py-22">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">Latest Posts</h2>
          <p className="text-blue-500 text-center">Latest posts appear here</p>
        </div>
      </div>
    </div>
  );
}
