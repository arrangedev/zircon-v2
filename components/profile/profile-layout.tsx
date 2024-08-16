"use client";
import { cn } from "@/lib/utils";
import { User, UserMetadata } from "@supabase/supabase-js";
import { IconBrandGithub, IconQuestionMark } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function ProfileLayout({ user }: { user: User }) {
  return (
    <main className="py-10">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <motion.div
          initial={{ opacity: 0.5, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex items-center space-x-5"
        >
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                alt=""
                src={user.user_metadata.avatar_url}
                className="h-16 w-16 rounded-full"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full shadow-inner"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {user.user_metadata.user_name}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Joined on <time dateTime="2020-08-25">{user.created_at}</time>
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3"
        >
          <button
            type="button"
            className="inline-flex gap-2 items-center justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <IconBrandGithub className="h-4 w-4" />
            View on GitHub
          </button>
        </motion.div>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0.5, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="space-y-6 lg:col-span-2 lg:col-start-1"
        >
          {/* Description list*/}
          <section aria-labelledby="applicant-information-title">
            <div className="bg-mid shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  className="text-lg font-medium leading-6 text-white"
                >
                 Recent Activity
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-300">
                  Courses and challenges completed in the last week.
                </p>
              </div>
              <div className="border-t border-zinc-700 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8">
                  <div className="sm:col-span-1 p-3 border border-zinc-700 rounded-md">
                    <dt className="text-sm font-medium text-zinc-100">
                      Intro to Solana
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-500">
                      Completed on 08/14/2023
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          {/* Comments*/}
          <section aria-labelledby="notes-title">
            <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
              <div className="divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="notes-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    Notes
                  </h2>
                </div>
                <div className="px-4 py-6 sm:px-6">
                  <ul role="list" className="space-y-8"></ul>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-6 sm:px-6">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <img alt="" src={""} className="h-10 w-10 rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <form action="#">
                      <div>
                        <label htmlFor="comment" className="sr-only">
                          About
                        </label>
                        <textarea
                          id="comment"
                          name="comment"
                          rows={3}
                          placeholder="Add a note"
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <a
                          href="#"
                          className="group inline-flex items-start space-x-2 text-sm text-gray-500 hover:text-gray-900"
                        >
                          <IconQuestionMark
                            aria-hidden="true"
                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          />
                          <span>Some HTML is okay.</span>
                        </a>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          Comment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>

        <section
          aria-labelledby="timeline-title"
          className="lg:col-span-1 lg:col-start-3"
        >
          <motion.div
            initial={{ opacity: 0.5, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="bg-mid px-4 py-5 shadow sm:rounded-lg sm:px-6"
          >
            <h2
              id="timeline-title"
              className="text-lg font-medium text-white"
            >
              Badges
            </h2>

            {/* Activity Feed */}
            <div className="mt-6 flow-root">
              <ul role="list" className="-mb-8"></ul>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
