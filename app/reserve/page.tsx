"use client";

import { useState } from "react";
import { supabase } from "@lib/supabase";
import Button from "@components/button/Button";
import styles from "./reserve.module.scss";

type ReservationForm = {
  name: string;
  phone: string;
  startDate: string;
  endDate: string;
  people: number;
  memo: string;
};

export default function ReservePage() {
  const [form, setForm] = useState<ReservationForm>({
    name: "",
    phone: "",
    startDate: "",
    endDate: "",
    people: 1,
    memo: "",
  });

  // 연락처 하이픈 자동 삽입 함수
  const formatPhoneNumber = (value: string) => {
    const onlyNums = value.replace(/\D/g, ""); // 숫자만 남기기

    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    if (onlyNums.length <= 11)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
        7
      )}`;

    return onlyNums;
  };

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setForm((prev) => ({ ...prev, phone: formatted }));
    } else if (name === "people") {
      setForm((prev) => ({ ...prev, people: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 예약 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("reservations").insert([form]);

    if (error) {
      alert("예약이 정상 처리되지 않았습니다. 다시 시도해주세요.");
      console.error(error);
    } else {
      alert("예약이 완료되었습니다. 확인 후 연락드리겠습니다 :)");
      setForm({
        name: "",
        phone: "",
        startDate: "",
        endDate: "",
        people: 1,
        memo: "",
      });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>펜션 예약하기</h2>
        <form onSubmit={handleSubmit}>
          <ul className={styles.formList}>
            <li className={styles.formItem}>
              <label htmlFor="name" className={styles.label}>
                예약자명
              </label>
              <div className={styles.writeBox}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </li>
            <li className={styles.formItem}>
              <label htmlFor="phone" className={styles.label}>
                연락처
              </label>
              <div className={styles.writeBox}>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={13}
                  required
                />
              </div>
            </li>
            <li className={styles.formItem}>
              <label htmlFor="startDate" className={styles.label}>
                예약일
              </label>
              <div className={`${styles.writeBox} ${styles.writeDate}`}>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  max="9999-12-31"
                  required
                />
                <span> - </span>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  max="9999-12-31"
                  required
                />
              </div>
            </li>
            <li className={styles.formItem}>
              <label htmlFor="people" className={styles.label}>
                인원
              </label>
              <div className={styles.writeBox}>
                <input
                  type="number"
                  id="people"
                  name="people"
                  min="1"
                  value={form.people}
                  onChange={handleChange}
                  required
                />
              </div>
            </li>
            <li className={styles.formItem}>
              <label htmlFor="memo" className={styles.label}>
                메모
              </label>
              <div className={styles.writeBox}>
                <textarea
                  id="memo"
                  name="memo"
                  value={form.memo}
                  onChange={handleChange}
                />
              </div>
            </li>
          </ul>
          <Button
            type="submit"
            className={styles.submitBtn}
            customClass="submit"
          >
            예약하기
          </Button>
        </form>
      </div>
    </section>
  );
}
