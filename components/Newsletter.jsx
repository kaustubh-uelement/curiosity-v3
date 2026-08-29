"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | error | done

  const submit = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setState("error");
      return;
    }
    /* Wire this to your ESP / CRM endpoint. */
    setState("done");
    setEmail("");
  };

  return (
    <div className="nl">
      <div>
        <h2 className="dispLg">
          Stay close to
          <br />
          the buildout.
        </h2>
      </div>
      <div>
        <form className="nlForm" onSubmit={submit} noValidate>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state !== "idle") setState("idle");
            }}
            placeholder="you@company.com"
            aria-label="Email address for newsletter"
            required
          />
          <Button variant="primary" type="submit">
            {state === "done" ? "Subscribed" : "Sign up"}
          </Button>
        </form>
        <p className="nlNote" role="status" aria-live="polite">
          {state === "error"
            ? "Please enter a valid email address."
            : state === "done"
            ? "Thanks! We'll be in touch as capacity comes online."
            : "Stay updated on cluster additions, site launches and GPU availability."}
        </p>
      </div>
    </div>
  );
}
