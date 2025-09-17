"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function FavoriteButton({ name, image, order }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    async function checkFavorite() {
      const res = await fetch(`/api/data?name=${name}`);
      if (!res.ok) return;
      const data = await res.json();
      setIsFav(data.isFav);
    }
    checkFavorite();
  }, [name]);

  async function toggleFavorite() {
    const res = await fetch("/api/data", {
      method: isFav ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image, order }),
    });

    const data = await res.json();

    setIsFav(!isFav);
  }

  return (
    <button onClick={toggleFavorite}>
      {isFav ? (
        <Heart className="w-fit h-fit p-1 rounded-full text-white bg-red-500" />
      ) : (
        <Heart className="w-fit h-fit p-1  text-white" />
      )}
    </button>
  );
}
