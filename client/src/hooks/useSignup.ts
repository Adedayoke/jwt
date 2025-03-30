import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signupUser, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("signup failed:", error);
    },
  });

  return { signupUser, isPending };
}
