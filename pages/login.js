import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) alert(error.message);
    else {
      router.push("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded">
        <h1 className="text-2xl mb-4">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
