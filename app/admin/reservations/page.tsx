"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@lib/supabase";

type Reservation = {
  id: string;
  name: string;
  phone: string;
  startDate: string;
  endDate: string;
  people: number;
  memo: string;
  created_at: string;
};

export default function AdminReservationsPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const hasRedirected = useRef(false); // alert + redirect 중복 방지 플래그

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          alert("로그인이 필요합니다.");
          router.replace("/login");
        }
        return;
      }

      const { data: authority, error: authorityError } = await supabase
        .from("user_info")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (authorityError || !authority?.is_admin) {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          alert("접근 권한이 없습니다.");
          router.replace("/");
        }
        return;
      }

      setIsAuthorized(true);
      setAuthChecked(true); // 권한 체크 완료

      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("예약 데이터를 불러오지 못했습니다:", error);
      } else {
        setReservations(data as Reservation[]);
      }

      setLoading(false);
    };

    loadData();
  }, [router]);

  // 인증 체크 완료 전까진 아무것도 렌더링하지 않음
  if (!authChecked) return null;
  if (!isAuthorized) return null;

  return (
    <section>
      <h2>관리자 예약 리스트</h2>
      {loading ? (
        <p>불러오는 중...</p>
      ) : reservations.length === 0 ? (
        <p>등록된 예약이 없습니다.</p>
      ) : (
        <ul>
          {reservations.map((r) => (
            <li key={r.id}>
              <p>
                <strong>{r.name}</strong> ({r.people}명)
              </p>
              <p>
                {r.startDate} ~ {r.endDate}
              </p>
              <p>연락처: {r.phone}</p>
              <p>메모: {r.memo || "-"}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
