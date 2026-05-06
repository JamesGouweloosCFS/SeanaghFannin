import type { ImgHTMLAttributes } from "react";
import logoBlue from "@assets/Carrick_logo_blue (2).png";
import logoWhite from "@assets/Carrick_Logo_White 4 (1).png";

type BrandLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "height" | "width"> & {
  variant: "blue" | "white";
  /** Max height in px; width follows intrinsic aspect ratio — never stretched. */
  size?: "header" | "footer";
};

const sizes = {
  header: { className: "brand-logo brand-logo--header" },
  footer: { className: "brand-logo brand-logo--footer" },
} as const;

/**
 * Carrick logos must preserve aspect ratio. Do not set both width and height in HTML;
 * CSS uses max-height + width: auto + object-fit: contain only.
 */
export function BrandLogo({ variant, size = "header", className, alt, ...rest }: BrandLogoProps) {
  const src = variant === "white" ? logoWhite : logoBlue;
  const base = sizes[size].className;
  return (
    <img
      src={src}
      alt={alt ?? "Carrick Wealth"}
      className={[base, className].filter(Boolean).join(" ")}
      decoding="async"
      {...rest}
    />
  );
}
