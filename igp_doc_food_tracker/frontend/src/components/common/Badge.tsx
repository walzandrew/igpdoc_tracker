type BadgeProps = {
  text: string;
  variant?: "dop" | "igp" | "stg" | "type";
};

export default function Badge({ text, variant = "type" }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{text}</span>;
}
