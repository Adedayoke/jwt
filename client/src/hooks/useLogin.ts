import { useMutation } from "@tanstack/react-query";
import { login } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return { loginUser, isPending };
}
