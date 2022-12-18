import { inject } from "@vercel/analytics";

export default defineNuxtPlugin(() => {
  // Inject plugin only on prod build
  if (import.meta.env.PROD) {
    console.info("Vercel Tracking Enabled");
    inject();
  }
});
