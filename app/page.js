"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push("/dashboard")}>
        Click me
      </Button>
    </div>
  );
}
