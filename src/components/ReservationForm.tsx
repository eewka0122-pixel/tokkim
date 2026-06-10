"use client";

import { FormEvent, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";

const ReservationForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    const form = event.currentTarget;

    window.setTimeout(() => {
      showSuccess("Reservation request received. Our concierge will confirm shortly.");
      form.reset();
      setLoading(false);
    }, 600);
  };

  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-stone-950 px-4 py-24 text-stone-50 sm:px-6 lg:px-8"
    >
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
            Reservations
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Reserve your evening at Seoul Garden.
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-400">
            Tell us about your party and we’ll prepare a refined dining
            experience before you arrive.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="reveal reveal-delay-100 mt-12 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:p-10"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                required
                className="mt-2 rounded-2xl border-white/10 bg-stone-950/70 text-stone-50 placeholder:text-stone-600 focus:border-amber-200/70 focus:ring-amber-200/40"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="mt-2 rounded-2xl border-white/10 bg-stone-950/70 text-stone-50 placeholder:text-stone-600 focus:border-amber-200/70 focus:ring-amber-200/40"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+82 10 0000 0000"
                required
                className="mt-2 rounded-2xl border-white/10 bg-stone-950/70 text-stone-50 placeholder:text-stone-600 focus:border-amber-200/70 focus:ring-amber-200/40"
              />
            </div>

            <div>
              <Label htmlFor="date">Preferred date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                required
                className="mt-2 rounded-2xl border-white/10 bg-stone-950/70 text-stone-50 placeholder:text-stone-600 focus:border-amber-200/70 focus:ring-amber-200/40"
              />
            </div>

            <div>
              <Label htmlFor="guests">Guests</Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                placeholder="2"
                required
                className="mt-2 rounded-2xl border-white/10 bg-stone-950/70 text-stone-50 placeholder:text-stone-600 focus:border-amber-200/70 focus:ring-amber-200/40"
              />
            </div>

            <div>
              <Label htmlFor="occasion">Occasion</Label>
              <Input
                id="occasion"
                name="occasion"
                placeholder="Anniversary, business dinner..."
                className="mt-2 rounded-2xl border-white/10 bg-stone-950/70 text-stone-50 placeholder:text-stone-600 focus:border-amber-200/70 focus:ring-amber-200/40"
              />
            </div>
          </div>

          <div className="mt-5">
            <Label htmlFor="message">Special requests</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Dietary preferences, seating requests, or celebration notes."
              className="mt-2 min-h-28 rounded-2xl border-white/10 bg-stone-950/70 text-stone-50 placeholder:text-stone-600 focus:border-amber-200/70 focus:ring-amber-200/40"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-amber-200 px-8 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100 disabled:opacity-60"
          >
            {loading
              ? "Sending request..."
              : (
                  <>
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Request reservation
                  </>
                )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ReservationForm;