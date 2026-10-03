"use client";

import { useState } from "react";

type Meal = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  type: string;
};

const calorieTarget = 1900;
const proteinTarget = 110;
const carbsTarget = 220;
const fatTarget = 63;

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [showForm, setShowForm] = useState(false);

  const totalCalories = meals.reduce(
    (total, meal) => total + meal.calories,
    0
  );

  const totalProtein = meals.reduce(
    (total, meal) => total + meal.protein,
    0
  );

  const totalCarbs = meals.reduce(
    (total, meal) => total + meal.carbs,
    0
  );

  const totalFat = meals.reduce(
    (total, meal) => total + meal.fat,
    0
  );

  const remainingCalories = Math.max(
    calorieTarget - totalCalories,
    0
  );

  function addMeal(meal: Meal) {
    setMeals((currentMeals) => [...currentMeals, meal]);
    setShowForm(false);
  }

  function deleteMeal(id: number) {
    setMeals((currentMeals) =>
      currentMeals.filter((meal) => meal.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#171717]">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            CalorieTrack
          </h1>

          <button className="rounded-full border border-black/10 px-4 py-2 text-sm">
            Profile
          </button>
        </header>

        {/* Greeting */}
        <section className="mb-10">
          <p className="mb-2 text-sm text-black/50">
            Saturday, October 3
          </p>

          <h2 className="text-4xl font-semibold tracking-tight">
            Good afternoon 👋
          </h2>
        </section>

        {/* Calories */}
        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="mb-2 text-sm text-black/50">
            Today&apos;s calories
          </p>

          <div className="mb-6 flex items-end gap-2">
            <span className="text-6xl font-semibold">
              {totalCalories}
            </span>

            <span className="mb-2 text-black/40">
              / {calorieTarget} kcal
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-black/5">
            <div
              className="h-full rounded-full bg-black transition-all duration-500"
              style={{
                width: `${Math.min(
                  (totalCalories / calorieTarget) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          <p className="mt-3 text-sm text-black/50">
            {remainingCalories} calories remaining
          </p>
        </section>

        {/* Macros */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <MacroCard
            name="Protein"
            value={`${totalProtein}g`}
            target={`${proteinTarget}g`}
          />

          <MacroCard
            name="Carbs"
            value={`${totalCarbs}g`}
            target={`${carbsTarget}g`}
          />

          <MacroCard
            name="Fat"
            value={`${totalFat}g`}
            target={`${fatTarget}g`}
          />
        </section>

        {/* Meals */}
        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Today&apos;s meals
            </h3>

            <button
              onClick={() => setShowForm(true)}
              className="rounded-full bg-black px-5 py-2.5 text-sm text-white transition hover:scale-105"
            >
              + Add meal
            </button>
          </div>

          {meals.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-black/10 p-10 text-center">
              <p className="text-black/40">
                No meals logged yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm"
                >
                  <div>
                    <p className="font-medium">
                      {meal.name}
                    </p>

                    <p className="mt-1 text-sm text-black/40">
                      {meal.type} · {meal.protein}g protein ·{" "}
                      {meal.carbs}g carbs · {meal.fat}g fat
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      {meal.calories} kcal
                    </span>

                    <button
                      onClick={() => deleteMeal(meal.id)}
                      className="text-sm text-black/30 hover:text-black"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add Meal Modal */}
      {showForm && (
        <AddMealModal
          onClose={() => setShowForm(false)}
          onAdd={addMeal}
        />
      )}
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
      <p className="text-sm text-black/50">
        {name}
      </p>

      <p className="mt-3 text-2xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-sm text-black/40">
        of {target}
      </p>
    </div>
  );
}


function AddMealModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (meal: Meal) => void;
}) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [type, setType] = useState("Lunch");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !calories) {
      return;
    }

    onAdd({
      id: Date.now(),
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      type,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Add a meal
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-black/40 hover:text-black"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <Input
            label="Food name"
            placeholder="Chicken biryani"
            value={name}
            onChange={setName}
          />

          <Input
            label="Calories"
            placeholder="620"
            type="number"
            value={calories}
            onChange={setCalories}
          />

          <div className="grid grid-cols-3 gap-3">

            <Input
              label="Protein"
              placeholder="28"
              type="number"
              value={protein}
              onChange={setProtein}
            />

            <Input
              label="Carbs"
              placeholder="72"
              type="number"
              value={carbs}
              onChange={setCarbs}
            />

            <Input
              label="Fat"
              placeholder="24"
              type="number"
              value={fat}
              onChange={setFat}
            />

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Meal
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-2xl bg-black py-3.5 text-sm font-medium text-white transition hover:scale-[1.01]"
          >
            Add to diary
          </button>

        </form>
      </div>
    </div>
  );
}


function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-black/10 px-4 py-3 outline-none placeholder:text-black/20 focus:border-black"
      />
    </div>
  );
}