"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function FavoriteButton({ name, image, order, user }) {
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkFavorite() {
      const res = await fetch(`/api/data?UserId=${user}&name=${name}`);
      if (!res.ok) return;
      const data = await res.json();
      setIsFav(data.isFav);
    }
    checkFavorite();
  }, [name]);

  async function toggleFavorite() {
    if (loading) return;
    setLoading(true);
    const UserId = user;

    try {
      const res = await fetch("/api/data", {
        method: isFav ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserId, name, image, order }),
      });

      if (res.ok) {
        setIsFav(!isFav);
      }
    } finally {
      setLoading(false);
    }
  }
  if (!user) {
    return (
      <Link href="/favorites" className="text-center text-xs pt-2">
        login to add
      </Link>
    );
  }
  return (
    <button onClick={toggleFavorite} disabled={loading}>
      {isFav ? (
        <Heart className="w-6 mx-2 md:w-fit h-6 md:h-fit p-0.5 rounded-full text-white bg-red-500" />
      ) : (
        <Heart className="w-6 mx-2 md:w-fit h-6 md:h-fit p-0.5 rounded-full text-white" />
      )}
    </button>
  );
}
