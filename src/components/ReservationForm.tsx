"use client";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ReservationForm = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Make a Reservation</h2>
        <Form method="dialog">
          <div className="grid gap-6 md:grid-cols-2">
            <Input type="text" name="name" placeholder="Full Name" required className="w-full" />
            <Input type="email" name="email" placeholder="Email Address" required className="w-full" />
            <Input type="tel" name="phone" placeholder="Phone Number" required className="w-full" />
            <Input type="date" name="date" required className="w-full" />
            <Input type="number" name="guests" placeholder="Number of Guests" min="1" max="10" required className="w-full" />
          </div>
          <div className="mt-6">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Requests</Label>
            <Input type="text" name="message" placeholder="e.g., Celebration, Dietary restrictions" className="w-full" />
          </div>
          <div className="mt-8 flex justify-end">
            <Button type="submit" className="rounded-full bg-indigo-600 text-white px-8 py-3 font-medium hover:bg-indigo-700 transition-colors">
              Reserve Now
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ReservationForm;