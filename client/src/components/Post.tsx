import { useAuth } from "../hooks/useAuth";
import { PostType } from "../services/types";
import { HiOutlineTrash } from "react-icons/hi2";
import ModalDetails from "./Modal";

export default function Post({
  postText,
  postUsername,
  postUserFirstName,
  hrDiff,
  imageUrl,
  showState
}: PostType) {

  return (
    <article className="px-5 py-3 border-b border-[#3e4144] flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="font-semibold">{postUserFirstName}</span>
          <span className="text-[#3e4144]">
            @{postUsername} - {hrDiff}
          </span>
        </div>
        {showState && (
          <div>
            <ModalDetails>
              <ModalDetails.ModalOpener opensModalName="confirmDelete">
                <HiOutlineTrash
                  className="hover:text-blue-500 cursor-pointer outline-none"
                  size={20}
                />
              </ModalDetails.ModalOpener>
              <ModalDetails.ModalWindow
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-video rounded-xl border border-[#3e4144] shadow-lg py-5 px-3"
                name="confirmDelete"
                buttonClass="block ml-auto text-[#3e4144] hover:text-blue-500"
              >
                <ModalView />
              </ModalDetails.ModalWindow>
            </ModalDetails>
          </div>
        )}
      </div>
      <p className="text-base whitespace-pre-wrap">{postText}</p>
    </article>
  );
}

function ModalView({ onCloseModal }: { onCloseModal?: () => void }) {
  return (
    <div className="flex flex-col justify-around h-full">
      <h1 className="text-white text-center text-2xl">
        Are you sure you want to delete this post?
      </h1>
      <div className="text-white flex gap-4">
        <button className="bg-blue-500 block w-full py-3 rounded-full cursor-pointer">
          Confirm
        </button>
        <button
          onClick={onCloseModal}
          className="border border-blue-500 block w-full py-3 rounded-full cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
