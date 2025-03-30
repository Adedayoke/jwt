import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { InputBox } from "../components/InputBox";
import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { FaSpinner } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser, isPending: isLoading } = useLogin();

  useEffect(
    function () {
      const resetErrorTimeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(resetErrorTimeout);
    },
    [error]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    loginUser({ email, password });
  }
  return (
    <AuthLayout handleSubmit={handleSubmit} header="Login to your account">
      <InputBox
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        type="email"
        placeholder="Email"
      />
      <InputBox
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        placeholder="Password"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="text-center block bg-blue-500 w-full mx-auto py-3 px-5 rounded-full cursor-pointer"
      >
        {!isLoading? "Login" : <FaSpinner className="animate-spin block mx-auto" size={20} />}
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <p className="text-center">Or</p>

      <Link to="/signup">
        <button
          disabled={isLoading}
          className="text-center block border border-blue-500 w-full mx-auto py-3 px-5 rounded-full cursor-pointer"
        >
          Create an account
        </button>
      </Link>
    </AuthLayout>
  );
}
