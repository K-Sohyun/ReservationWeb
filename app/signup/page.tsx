"use client";

import { useState } from "react";
import { supabase } from "@lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./signup.module.scss";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 길이 검사
    if (password.length < 6) {
      setMessage("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    // 회원가입 요청
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      if (error.message === "User already registered") {
        setMessage("이미 가입된 이메일입니다.");
      } else {
        setMessage("오류가 발생했습니다.");
        console.log(error.message);
      }
      return;
    }

    // 자동 로그인된 유저 정보 사용해 user_info에 insert
    const user = data.user;

    if (user) {
      const { data: existing, error: selectError } = await supabase
        .from("user_info")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!existing && !selectError) {
        const { error: insertError } = await supabase
          .from("user_info")
          .insert([{ id: user.id, is_admin: false }]);

        if (insertError && insertError.code !== "23505") {
          console.error("insert 오류 : ", insertError.message);
        }
      }
    }

    setMessage("회원가입이 완료됐습니다. 로그인 페이지로 이동합니다.");
    setTimeout(() => {
      router.replace("/login");
    }, 1000);
  };

  return (
    <section className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>회원가입</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 (6자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className={styles.errorMsg}>{message}</p>
          <button type="submit" className={styles.submitBtn}>
            가입하기
          </button>
        </form>
      </div>
    </section>
  );
}
