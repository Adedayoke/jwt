import { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { CircularProgress } from "../components/CircularProgressBar";
import Post from "../components/Post";
import { PostType } from "../services/types";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";
let MAX_POST = 200;
export default function Home() {
  const [postText, setPostText] = useState<string>("");
  const [postLimit, setPostLimit] = useState<number>(0); // Character limit
  const [allPosts, setAllPosts] = useState<PostType[]>([]); // Array of posts
  const { auth } = useAuth();
  const inputDivRef = useRef<HTMLDivElement>(null);

  function handleInput(e: any) {
    const post = e.target.innerText.trim();
    const postLength = post.replace(/\s/g, "").length; // Removes ALL spaces


    console.log(post, postLength);

    if (postLength >= 200) {
      e.target.innerText = postText; // Prevents extra typing
      return;
    }

    setPostText(post);
  }
  useEffect(() => {
    const percentage = (postText.length / MAX_POST) * 100; // Calculate percentage
    setPostLimit(percentage);
  }, [postText]);

  function addNewPost() {
    setPostText(""); // Clear the input after posting
    if (inputDivRef.current) {
      inputDivRef.current.innerText = ""; // Clear the editable div
    }
    if (!postText) return; // Prevents empty posts
    const newPost: PostType = {
      postText: postText,
      postUsername: "Adedayoke",
      postUserFirstName: "Habeeb",
      hrDiff: "1hr",
      imageUrl: "",
    };
    setAllPosts((prevPosts) => [...prevPosts, newPost]);
    setPostText(""); // Clear the input after posting
  }

  return (
    <div className="grid grid-cols-[20rem_1fr_25rem] text-lg bg-[rgba(0,0,0)] text-white h-screen px-6">
      <Sidebar />
      <div className="border-[#3e4144] border-r-1">
        <h2 className="text-center py-3 text-xl border-b border-[#3e4144] flex flex-col gap-3">
          Posts
        </h2>
        <div className="px-5 my-3 border-b border-[#3e4144]">
          <div className="relative min-h-12 border-[#3e4144] border-b px-2 outline-none">
            {/* Editable div */}
            <div
              ref={inputDivRef}
              className="w-full min-h-12 h-fit outline-none break-all py-2"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onInput={handleInput}
            ></div>

            {/* Placeholder text */}
            {!postText && (
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#3e4144] font-semibold pointer-events-none">
                Type Something...
              </span>
            )}
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="relative overflow-hidden">
              <input type="file" className="absolute left-0 top-0 opacity-0" />
              <FaRegImage className="text-blue-500" />
            </div>

            <div className="flex items-center gap-3">
              <CircularProgress percentage={postLimit} />
              <button
                onClick={addNewPost}
                className="bg-white cursor-pointer text-black rounded-full px-5 font-semibold py-1"
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {allPosts.length > 0 ? (
          allPosts.map((post, id) => (
            <Post
              showState={auth?.role === "admin"}
              hrDiff={post.hrDiff}
              postText={post.postText}
              postUserFirstName={post.postUserFirstName}
              imageUrl={post.imageUrl}
              postUsername={post.postUsername}
              key={id}
            />
          ))
        ) : (
          <p className="text-center">
            No posts yet, be the first to create a post!!
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
