export default function Logo({ size = 30, outline = "#141414" }: { size?: number; outline?: string }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.8)}
      viewBox="0 0 100 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 54 Q6 47 14 46 L86 46 Q94 47 94 54 Q94 60 86 60 L14 60 Q6 60 6 54 Z"
        fill="#FFCB05"
        stroke={outline}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M18 48 Q18 18 50 16 Q82 18 82 48 Z"
        fill="#FFCB05"
        stroke={outline}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M50 16 L50 48 M34 20 L34 48 M66 20 L66 48"
        stroke="#141414"
        strokeWidth="3"
      />
      <path d="M41 14 Q50 10 59 14 L59 20 Q50 16 41 20 Z" fill="#141414" />
    </svg>
  );
}
