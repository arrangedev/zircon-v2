export default function ClientSection() {
  return (
    <section
      id="clients"
      className="text-center mx-auto max-w-[80rem] px-6 md:px-8"
    >
      <div className="py-14">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h2 className="text-center text-sm font-semibold text-gray-400 uppercase">
            Our students have secured jobs at the best startups
          </h2>
          <div className="mt-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&_path]:fill-white">
              <li>
                <img
                  src={`/turbine-logo-text-white.svg`}
                  className="h-8 w-36 px-2 dark:brightness-0 dark:invert"
                />
              </li>
              <li>
                <img
                  src={`/metaplex-logo.png`}
                  className="w-48 px-2 dark:brightness-0 dark:invert"
                />
              </li>
              <li>
                <img
                  src={`/squads-logo.svg`}
                  className="h-8 w-36 px-2 dark:brightness-0 dark:invert"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
