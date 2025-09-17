"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  function handleSearch(e) {
    e.preventDefault();
    router.push(`/search/${searchTerm.toLowerCase()}`);
    if (searchTerm === "") {
      router.push(`/`);
    }
  }

  const showNavbar =
    ["/", "/pokemon", "/about", "/favorites"].includes(pathname) ||
    pathname.startsWith("/search");
  if (!showNavbar) return null;
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        // background: 'transparent',
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      className="sticky top-0 z-50 bg-slate-950/70 gap-0.5 "
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href="/" className="flex items-center">
          <img
            src="/image/pokeball.png"
            alt="Pokédex"
            style={{ width: 40, height: 40, marginRight: 12 }}
          />
          <span style={{ fontWeight: "bold", fontSize: 24 }}>Pokédex</span>
        </Link>
        <Link href="/favorites" className="mx-10">
          Favorites
        </Link>
      </div>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <form
          action=""
          onSubmit={handleSearch}
          style={{ display: "flex", gap: "0.5rem" }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pokémon..."
          />
          <button type="submit">Search</button>
        </form>
        <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>

        <Link href="/about" style={{ color: "#fff", textDecoration: "none" }}>
          About
        </Link>
      </div>
    </nav>
  );
}
