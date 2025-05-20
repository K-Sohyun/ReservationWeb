import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  customClass?: string; // 용도별 클래스 (primary, secondary 등)
  className?: string; // 추가 클래스
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  children,
  customClass,
  className,
  type,
  onClick,
}: ButtonProps) {
  // 기본 버튼 클래스
  let buttonClass = styles.comBtn;

  // customClass가 존재하면 추가적으로 적용
  if (customClass) {
    const customClasses = customClass
      .split(" ") // 여러 개의 클래스를 공백 기준으로 분리
      .map((cls) => styles[`comBtn--${cls}`]) // styles["comBtn--primary"], styles["comBtn--ico"]로 변환
      .join(" "); // 하나의 문자열로 합침

    buttonClass += ` ${customClasses}`;
  }

  // 추가 className가 있으면 적용
  if (className) {
    buttonClass += ` ${className}`;
  }

  // type 없으면 button으로 설정
  if (!type) {
    type = "button";
  }

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
