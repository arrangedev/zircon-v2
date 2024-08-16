import CourseWrapper from "@/components/course-wrapper";
import { Course, courses } from "@/lib/courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course | Zircon",
  description:
    "Discover courses and tutorials to help you learn to build on Solana.",
};

export default function Page({ params }: { params: { slug: string } }) {
  const course: Course | undefined = courses.find(
    (course) => course.slug === params.slug
  );

  if (!course) {
    return <div>Course not found</div>;
  } else {
    return (
      <>
        <CourseWrapper course={course} />
      </>
    );
  }
}
