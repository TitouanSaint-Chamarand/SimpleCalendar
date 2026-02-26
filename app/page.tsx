"use client";

import Calendar from "@/components/calendar/Calendar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <Calendar />
    </div>
  );
}
