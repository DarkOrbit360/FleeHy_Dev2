import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionUser = supabase.auth.session()?.user;
    setUser(sessionUser);
  }, []);

  return (
    <nav className="flex justify-between p-4 bg-gray-100">
      <div className="font-bold text-xl">FleeHy</div>
      <div className="space-x-4">
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
        {user && (
          <>
            <span>{user.email}</span>
            <Link href="/host-verification">HOST</Link>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
