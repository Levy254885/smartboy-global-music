import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Smartboy Management — East Africa's Premier Record Label & Talent Agency" },
      { name: "description", content: "Smartboy Management is East Africa's premier record label and talent management house in Nairobi, Kenya — partnered with Warner Music Africa, Virgin Music Group and ACTS Music Group. We build legacies across Afro-fusion, drill, trap and R&B." },
      { name: "keywords", content: "Smartboy Management, Kenyan record label, East Africa music label, Nairobi music management, African artist management, Afrobeats label, Warner Music Africa partner, Virgin Music Group, ACTS Music Group, Peter Ombati, Dalla Stains, Nova Flow Boyz, 50Boyz, music distribution Kenya" },
      { name: "author", content: "Smartboy Management" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "theme-color", content: "#000000" },
      { property: "og:site_name", content: "Smartboy Management" },
      { property: "og:title", content: "Smartboy Management — East Africa's Premier Record Label" },
      { property: "og:description", content: "Building Dreams. Creating Stars. Growing Audiences. Nairobi-based label partnered with Warner Music Africa, Virgin Music Group & ACTS Music Group." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Smartboy Management" },
      { name: "twitter:description", content: "East Africa's premier record label and talent management house." },
    ],
    links: [
      { rel: "icon", type: "image/jpeg", href: "/favicon.jpg" },
      { rel: "apple-touch-icon", href: "/favicon.jpg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MusicGroup",
              "@id": "#org",
              name: "Smartboy Management",
              alternateName: "SBM",
              description: "East Africa's premier record label and talent management house, building legacies for African artists across Afro-fusion, drill, trap and R&B.",
              foundingDate: "2020",
              foundingLocation: "Nairobi, Kenya",
              genre: ["Afrobeats", "Afro-fusion", "Hip-Hop", "Drill", "Trap", "R&B"],
              email: "hello@smartboymgmt.co",
              telephone: "+254 700 000 000",
              address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
              founder: { "@type": "Person", name: "Peter Ombati", jobTitle: "Founder & CEO" },
              memberOf: [
                { "@type": "Organization", name: "Warner Music Africa" },
                { "@type": "Organization", name: "Virgin Music Group" },
                { "@type": "Organization", name: "ACTS Music Group" },
              ],
            },
            {
              "@type": "WebSite",
              "@id": "#site",
              name: "Smartboy Management",
              publisher: { "@id": "#org" },
              inLanguage: "en",
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Smartboy Management?",
                  acceptedAnswer: { "@type": "Answer", text: "Smartboy Management is East Africa's premier record label and talent management house, based in Nairobi, Kenya. Founded in 2020 by Peter Ombati, it develops artists across Afro-fusion, drill, trap and R&B." },
                },
                {
                  "@type": "Question",
                  name: "Where is Smartboy Management located?",
                  acceptedAnswer: { "@type": "Answer", text: "Smartboy Management is headquartered in Nairobi, Kenya, and operates across East Africa and the diaspora." },
                },
                {
                  "@type": "Question",
                  name: "Who are Smartboy Management's partners?",
                  acceptedAnswer: { "@type": "Answer", text: "Smartboy Management is partnered with Warner Music Africa, Virgin Music Group and ACTS Music Group for global distribution and publishing." },
                },
                {
                  "@type": "Question",
                  name: "How do I submit a demo to Smartboy Management?",
                  acceptedAnswer: { "@type": "Answer", text: "Visit the Contact section on smartboymgmt.co, choose 'Demo Submission' as the inquiry type, and include a SoundCloud, Google Drive or streaming link." },
                },
                {
                  "@type": "Question",
                  name: "Which artists are signed to Smartboy Management?",
                  acceptedAnswer: { "@type": "Answer", text: "The current roster includes Dalla Stains, Nova Flow Boyz, 50Boyz and Mr Handsome KE." },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
