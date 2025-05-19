"use client";

import { useState } from "react";
import { supabase } from "@lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const user = data?.user;

    if (error || !user) {
      if (error?.message.includes("Invalid login credentials")) {
        setError("이메일 또는 비밀번호가 잘못되었습니다.");
      } else {
        setError("오류 발생 : " + (error?.message || "알 수 없는 오류"));
      }
      return;
    }

    router.push("/");
  };

  return (
    <section>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </section>
  );
}
