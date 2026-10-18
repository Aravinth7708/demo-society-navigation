import { useEffect, useRef, useState } from "react";
import { Search, Menu, X } from "lucide-react";

const NAV = [
  "Fellows",
  "Events",
  "Journals",
  "Current topics",
  "Grants",
  "Medals and prizes",
  "About us",
  "News and resources",
];

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  return (
    <header className="relative border-t-2 border-brand-maroon bg-background">
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

        <div className="ml-8 flex flex-1 flex-col">
          <div className="flex h-[72px] items-center justify-end gap-6">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="text-foreground">
              <Search className="h-7 w-7" strokeWidth={2.5} />
            </button>
            <a href="#" className="text-[15px] font-medium text-foreground">Sign in</a>
            <button
              className="lg:hidden"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
          <nav className="hidden h-[72px] items-center justify-between border-b-[3px] border-nav-line lg:flex">
            {NAV.map((n) => (
              <a key={n} href="#" className="text-[17px] font-medium text-nav-text hover:text-brand">
                {n}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-nav-line bg-background px-4 py-2 lg:hidden">
          {NAV.map((n) => (
            <a key={n} href="#" className="py-3 text-[17px] font-medium text-nav-text">{n}</a>
          ))}
        </nav>
      )}

      {searchOpen && (
        <div className="absolute inset-0 z-50 min-h-[146px]">
          <div className="absolute inset-0 bg-overlay" onClick={() => setSearchOpen(false)} />
          <div className="relative mx-auto max-w-[1316px] px-4">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="ml-[215px] mr-[65px] mt-[6px] flex h-[60px] items-center bg-search px-6 max-lg:ml-0 max-lg:mr-0"
            >
              <input
                ref={inputRef}
                placeholder="Search"
                className="flex-1 bg-transparent text-[17px] text-foreground outline-none placeholder:text-foreground"
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
