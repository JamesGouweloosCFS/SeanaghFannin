/** Public URL of this app’s booking route (Firebase Hosting). Use in Microsoft 365 Bookings “publish to web” / allowed sites if required. */
export const BOOKING_PAGE_PUBLIC_URL = "https://cw-clone-b5b94.web.app/booking";

export const MICROSOFT_BOOKINGS_URL =
  "https://outlook.office.com/book/test2@CarrickFinancialSe.onmicrosoft.com/";

const BOOKING_EMBED_HOSTNAMES = (() => {
  try {
    const { hostname } = new URL(BOOKING_PAGE_PUBLIC_URL);
    const projectId = hostname.replace(/\.web\.app$/i, "");
    const hosts = new Set<string>([hostname, `${projectId}.firebaseapp.com`]);
    return [...hosts];
  } catch {
    return ["cw-clone-b5b94.web.app", "cw-clone-b5b94.firebaseapp.com"];
  }
})();

/** In-page iframe: on by default on deployed Firebase hosts; override with VITE_BOOKINGS_EMBED=true|false */
export function shouldUseBookingsIframe(): boolean {
  const flag = import.meta.env.VITE_BOOKINGS_EMBED;
  if (flag === "false") return false;
  if (flag === "true") return true;
  if (typeof window === "undefined") return false;
  return BOOKING_EMBED_HOSTNAMES.includes(window.location.hostname);
}
