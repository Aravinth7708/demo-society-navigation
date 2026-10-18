import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Demo Society" },
      { name: "description", content: "The Demo Society — fellows, events, journals, grants and more." },
      { property: "og:title", content: "The Demo Society" },
      { property: "og:description", content: "The Demo Society — fellows, events, journals, grants and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
    </div>
  );
}
