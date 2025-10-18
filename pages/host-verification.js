import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function HostVerification() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const router = useRouter();

  useEffect(() => {
    const sessionUser = supabase.auth.session()?.user;
    if (!sessionUser) router.push("/login");
    else setUser(sessionUser);
  }, []);

  const handleVerification = async (e) => {
    e.preventDefault();
    // Auto toggle role to HOST
    const { data, error } = await supabase
      .from("users")
      .update({ role: "HOST" })
      .eq("email", user.email);
    if (error) alert(error.message);
    else {
      alert("You are now a HOST!");
      router.push("/create-trip"); // Next page
    }
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded">
        <h1 className="text-2xl mb-4">Host Verification</h1>
        <form onSubmit={handleVerification} className="flex flex-col space-y-3">
          <textarea
            placeholder="Tell us about yourself"
            className="border p-2"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Become HOST
          </button>
        </form>
      </div>
    </>
  );
}
