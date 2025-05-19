"use client";

import { useEffect, useState } from "react";
import { supabase } from "@lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 초기 세션 체크
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // 세션 변경 감지
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("로그아웃 실패: " + error.message);
    } else {
      setIsLoggedIn(false);
      router.push("/");
    }
  };

  if (isLoggedIn === null) return null;

  return (
    <>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout}>
            ⓒ <span>[로그아웃]</span>
          </button>
          <Link href="/admin/reservations" className="listGoBtn">
            예약확인
          </Link>
        </>
      ) : (
        <button onClick={() => router.push("/login")}>ⓒ</button>
      )}
    </>
  );
}
