import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (name) {
    const fav = await prisma.userData.findUnique({
      where: { name }, // @unique in schema
    });
    return NextResponse.json({ isFav: !!fav });
  }

  const allFavorites = await prisma.userData.findMany({
    where: { image: { not: null } },
  });

  return NextResponse.json(allFavorites);
}

// POST-add favorite
export async function POST(req) {
  try {
    const { name, image, order } = await req.json();
    const pokemon = await prisma.userData.create({
      data: { name, image, order },
    });
    return NextResponse.json(pokemon);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE-remove favorite
export async function DELETE(req) {
  try {
    const { name } = await req.json();
    await prisma.userData.delete({ where: { name } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
