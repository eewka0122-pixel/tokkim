"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";

const contactDetails = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Address",
    value: "123 Han River Blvd, Seoul, South Korea",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "Hours",
    value: "Mon-Sun, 11:00 AM - 11:00 PM",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+82 2 1234 5678",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "reservations@seoulgarden.com",
  },
];

const mapImage =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="bg-stone-900 px-4 py-24 text-stone-50 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
            Contact
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Visit us for an unforgettable evening.
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-400">
            For private dining, events, or bespoke menus, contact our concierge
            team directly.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="reveal rounded-[2rem] border border-white/10 bg-stone-950/60 p-8">
            <div className="space-y-6">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-200/10 text-amber-100">
                    {detail.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-stone-50">
                      {detail.label}
                    </h3>
                    <p className="mt-1 text-stone-400">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-100 overflow-hidden rounded-[2rem] border border-white/10 bg-stone-950/60">
            <div
              style={{ backgroundImage: `url(${mapImage})` }}
              className="relative min-h-[360px] bg-cover bg-center"
            >
              <div className="absolute inset-0 bg-stone-950/55" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-stone-950/70 p-6 backdrop-blur">
                <h3 className="text-xl font-semibold text-stone-50">
                  Private dining & events
                </h3>
                <p className="mt-2 text-stone-300">
                  Reserve our Han River room for celebrations, business
                  dinners, and chef-led tasting experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;