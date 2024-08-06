"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicCourseEditor = dynamic(
  () => import("@/components/course-editor"),
  {
    ssr: false,
  }
);

export default function CourseWrapper() {
  const [progress, setProgress] = useState(25);
  return (
    <div className="h-full">
      <DynamicCourseEditor progress={progress} setProgress={setProgress} />
    </div>
  );
}
