import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { InputBox } from "../components/InputBox";
import { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { FaSpinner } from "react-icons/fa";

export default function Signup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signupUser, isPending: isLoading } = useSignup();

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

    signupUser({ firstname, lastname, username, email, password });
  }
  return (
    <AuthLayout handleSubmit={handleSubmit} header="Register">
      <InputBox
        onChange={(e) => setFirstName(e.target.value)}
        value={firstname}
        name="firstname"
        type="text"
        placeholder="First Name"
      />
      <InputBox
        onChange={(e) => setLastName(e.target.value)}
        value={lastname}
        name="lastname"
        type="text"
        placeholder="Last Name"
      />
      <InputBox
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        name="username"
        type="text"
        placeholder="Username"
      />
      <InputBox
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        type="email"
        placeholder="Email"
      />
      <InputBox
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
        type="password"
        placeholder="Password"
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button className="text-center block bg-blue-500 w-full mx-auto py-3 px-5 rounded-full cursor-pointer">
        {!isLoading? "Signup" : <FaSpinner className="animate-spin block mx-auto" size={20} />}
      </button>

      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-blue-500">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
