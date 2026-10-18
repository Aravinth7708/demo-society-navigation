import { useEffect, useRef, useState } from "react";
import { Search, Menu, X } from "lucide-react";

type Section = { title: string; links: string[] };
type Item = { label: string; columns: Section[][] };

const NAV: Item[] = [
  {
    label: "Fellows",
    columns: [
      [{ title: "Fellowship", links: ["Fellows directory", "Elections", "Nominating Fellows", "Fellows' resources"] }],
      [{ title: "Support", links: ["Fellows' events", "Contact the Fellowship team"] }],
    ],
  },
  {
    label: "Events",
    columns: [
      [{ title: "Upcoming", links: ["All events", "Scientific meetings", "Public lectures", "Online events"] }],
      [{ title: "Venue", links: ["Hire our venue", "Visiting us", "Accessibility"] }],
    ],
  },
  {
    label: "Journals",
    columns: [
      [{ title: "Publishing", links: ["All journals", "Submit an article", "Open access", "Subscriptions"] }],
      [{ title: "Authors", links: ["Author guidelines", "Reviewer resources", "Editorial boards"] }],
    ],
  },
  {
    label: "Current topics",
    columns: [
      [{ title: "Topics", links: ["Climate change", "Artificial intelligence", "Health and medicine", "Diversity and inclusion"] }],
      [{ title: "Policy", links: ["Policy projects", "Reports and publications"] }],
    ],
  },
  {
    label: "Grants",
    columns: [
      [
        { title: "Applying", links: ["See all grants", "Application and assessment process", "Application dates", "Flexi-Grant login"] },
        { title: "About Grants", links: ["Policies and positions", "Contact the Grants team"] },
      ],
      [{ title: "Support", links: ["Training and development opportunities", "Research Fellows Portal", "Global Talent Visa"] }],
    ],
  },
  {
    label: "Medals and prizes",
    columns: [
      [{ title: "Awards", links: ["All medals and prizes", "Nominate someone", "Past winners"] }],
      [{ title: "Book prizes", links: ["Science book prize", "Young people's book prize"] }],
    ],
  },
  {
    label: "About us",
    columns: [
      [{ title: "Who we are", links: ["Our mission", "History", "Governance", "Our people"] }],
      [{ title: "Get involved", links: ["Careers", "Contact us", "Support us"] }],
    ],
  },
  {
    label: "News and resources",
    columns: [
      [{ title: "Latest", links: ["News", "Blog", "Podcasts", "Videos"] }],
      [{ title: "Resources", links: ["Library and archives", "Education resources", "Press office"] }],
    ],
  },
];

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setActive(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [searchOpen]);

  const current = NAV.find((n) => n.label === active);

  return (
    <header ref={headerRef} className="relative border-t-2 border-brand-maroon bg-background">
      <div className="mx-auto flex max-w-[1316px] px-4">
        <a
          href="/"
          className="flex h-[144px] w-[144px] shrink-0 flex-col justify-center bg-brand pl-[17px] pt-6 font-logo leading-[0.85] text-brand-foreground"
          aria-label="The Demo Society home"
        >
          <span className="text-[13px] tracking-wide">THE</span>
          <span className="text-[25px]">DEMO</span>
          <span className="text-[25px]">SOCIETY</span>
        </a>

        <div className="relative ml-8 flex flex-1 flex-col">
          <div className="flex h-[72px] items-center justify-end gap-6">
            <button
              aria-label="Search"
              onClick={() => {
                setActive(null);
                setSearchOpen(true);
              }}
              className="text-foreground"
            >
              <Search className="h-7 w-7" strokeWidth={2.5} />
            </button>
            <a href="#" className="text-[15px] font-medium text-foreground">Sign in</a>
            <button className="lg:hidden" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>
              {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
          <nav className="hidden h-[72px] items-stretch justify-between border-b-[3px] border-nav-line lg:flex">
            {NAV.map((n) => (
              <button
                key={n.label}
                onClick={() => setActive(active === n.label ? null : n.label)}
                aria-expanded={active === n.label}
                className={`-mb-[3px] border-b-[3px] text-[17px] font-medium text-nav-text transition-colors hover:text-brand ${
                  active === n.label ? "border-nav-text" : "border-transparent"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          {current && (
            <div className="animate-dropdown absolute right-0 top-full z-40 hidden w-[60%] min-w-[640px] bg-search px-14 py-12 shadow-sm lg:block">
              <div className="grid grid-cols-2 gap-10">
                {current.columns.map((col, i) => (
                  <div key={i} className="space-y-10">
                    {col.map((s) => (
                      <div key={s.title}>
                        <h3 className="mb-5 text-[20px] font-medium text-foreground">{s.title}</h3>
                        <ul className="space-y-3">
                          {s.links.map((l) => (
                            <li key={l}>
                              <a href="#" className="text-[15px] font-medium text-foreground hover:text-brand hover:underline">
                                {l}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-nav-line bg-background px-4 py-2 lg:hidden">
          {NAV.map((n) => (
            <a key={n.label} href="#" className="py-3 text-[17px] font-medium text-nav-text">{n.label}</a>
          ))}
        </nav>
      )}

      {searchOpen && (
        <div className="absolute inset-0 z-50 min-h-[146px]">
          <div className="absolute inset-0 bg-overlay" onClick={() => setSearchOpen(false)} />
          <div className="relative mx-auto max-w-[1316px] px-4">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="animate-search-grow mt-[6px] flex h-[60px] items-center overflow-hidden bg-search px-6"
            >
              <input
                ref={inputRef}
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent text-[17px] text-foreground outline-none placeholder:text-foreground"
              />
              <button type="submit" aria-label="Submit search">
                <Search className="h-7 w-7" strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
