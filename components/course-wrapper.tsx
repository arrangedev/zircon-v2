"use client";
import { Course } from "@/lib/courses";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicCourseEditor = dynamic(
  () => import("@/components/course-editor"),
  {
    ssr: false,
  }
);

export default function CourseWrapper({ course }: { course: Course }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  return (
    <div className="h-full">
      <DynamicCourseEditor
        progress={progress}
        setProgress={setProgress}
        step={step}
        setStep={setStep}
        course={course}
      />
    </div>
  );
}
