"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Search } from "lucide-react";

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
    <nav className="flex flex-col items-center justify-between gap-2 text-white p-4 sticky top-0 w-full z-50 bg-slate-950/70 md:gap-0.5 md:flex-row ">
      <div className="flex items-center w-full justify-between">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/" className="flex items-center ">
            <img
              src="/image/pokeball.png"
              alt="Pokédex"
              style={{ width: 40, height: 40, marginRight: 12 }}
            />
            <span style={{ fontWeight: "bold", fontSize: 24 }}>Pokédex</span>
          </Link>
          <div className="mx-10">
            <Link href="/favorites" className=" md:not-sr-only sr-only ">
              Favorites
            </Link>
          </div>
        </div>
        <div className=" not-sr-only md:sr-only">
          <div className="flex flex-wrap gap-4">
            {" "}
            <div>
              <UserButton />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800/90 border-slate-700 text-white">
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link href="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/favorites">Favorites</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSearch}
        className="flex w-full mx-3 mt-2  not-sr-only md:sr-only  "
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Pokémon....."
          className="flex-1 border border-slate-400/55 focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none rounded-l-2xl px-6 py-1  text-white placeholder-slate-400 transition-colors duration-200"
        />
        <button
          type="submit"
          className="bg-slate-400/55 hover:bg-slate-500 text-black font-bold px-2  rounded-r-2xl shadow-md transition-colors duration-200"
        >
          <Search />
        </button>
      </form>
      <div
        style={{ display: "flex", gap: "1.5rem" }}
        className=" md:not-sr-only sr-only "
      >
        <form onSubmit={handleSearch} className="flex w-full  ">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pokémon....."
            className=" border border-slate-400/55 focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none rounded-l-2xl px-6 py-0.5  text-white placeholder-slate-400 transition-colors duration-200"
          />
          <button
            type="submit"
            className="bg-slate-400/55 hover:bg-slate-500 text-black font-bold px-2  rounded-r-2xl shadow-md transition-colors duration-200"
          >
            <Search />
          </button>
        </form>

        <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>

        <UserButton />
      </div>
    </nav>
  );
}
