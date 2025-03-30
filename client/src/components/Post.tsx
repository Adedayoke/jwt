import { PostType } from "../services/types";

export default function Post({
  postText,
  postUsername,
  postUserFirstName,
  hrDiff,
  imageUrl
}: PostType) {
  return (
    <article className="px-5 py-3 border-b border-[#3e4144] flex flex-col gap-2">
      <div className="flex gap-2">
        <span className="font-semibold">{postUserFirstName}</span>
        <span className="text-[#3e4144]">
          @{postUsername} - {hrDiff}
        </span>
      </div>
      <p className="text-base whitespace-pre-wrap">{postText}</p>
    </article>
  );
}
