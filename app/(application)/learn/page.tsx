import { CourseList } from "@/components/course-list";
import LearnBanner from "@/components/learn/banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn | Zircon",
  description:
    "Find courses, challenges, and resources to help you start building on Solana.",
};

export default async function Page() {
  return (
    <div className="p-12">
      <LearnBanner />
      <section className="mt-12">
        <CourseList />
      </section>
    </div>
  );
}
