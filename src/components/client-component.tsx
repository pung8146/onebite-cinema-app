"use client";

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("ClientComponent");
  return <div>{children}</div>;
}
