export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#171717]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-12 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            CalorieTrack
          </h1>

          <button className="rounded-full border border-black/10 px-4 py-2 text-sm">
            Profile
          </button>
        </header>

        <section className="mb-10">
          <p className="mb-2 text-sm text-black/50">
            Saturday, October 3
          </p>

          <h2 className="text-4xl font-semibold tracking-tight">
            Good afternoon 👋
          </h2>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-2 text-sm text-black/50">
            Today's calories
          </p>

          <div className="mb-6 flex items-end gap-2">
            <span className="text-6xl font-semibold">
              0
            </span>

            <span className="mb-2 text-black/40">
              / 1900 kcal
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-black/5">
            <div
              className="h-full rounded-full bg-black"
              style={{ width: "0%" }}
            />
          </div>

          <p className="mt-3 text-sm text-black/50">
            1900 calories remaining
          </p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <MacroCard
            name="Protein"
            value="0g"
            target="110g"
          />

          <MacroCard
            name="Carbs"
            value="0g"
            target="220g"
          />

          <MacroCard
            name="Fat"
            value="0g"
            target="63g"
          />
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Today's meals
            </h3>

            <button className="rounded-full bg-black px-5 py-2.5 text-sm text-white">
              + Add meal
            </button>
          </div>

          <div className="rounded-3xl border border-dashed border-black/10 p-10 text-center">
            <p className="text-black/40">
              No meals logged yet.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function MacroCard({
  name,
  value,
  target,
}: {
  name: string;
  value: string;
  target: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm text-black/50">{name}</p>

      <p className="mt-3 text-2xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-sm text-black/40">
        of {target}
      </p>
    </div>
  );
}