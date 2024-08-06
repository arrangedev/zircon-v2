import CourseWrapper from "@/components/course-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn | Zircon",
  description:
    "Discover courses and tutorials to help you learn to build on Solana.",
};

export default function Page() {
  return (
    <>
      <CourseWrapper />
    </>
  );
}
