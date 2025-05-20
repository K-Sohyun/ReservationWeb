"use client";

import { useState } from "react";
import { supabase } from "@lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";

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
        setError("오류가 발생했습니다.");
        console.log(error?.message || "알 수 없는 오류");
      }
      return;
    }

    router.push("/");
  };

  return (
    <section className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>로그인</h2>
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
          {error && <p className={styles.errorMsg}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>
            로그인
          </button>
        </form>
      </div>
    </section>
  );
}
