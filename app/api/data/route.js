import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// import { auth } from '@clerk/nextjs/server';

export async function GET(req) {
  //  const { userId } = auth();
  //  const UserId = await req.json();
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const UserId = searchParams.get("UserId");
// if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (name) {
    const fav = await prisma.userData.findUnique({
      where: {  name ,UserId }, // @unique in schema
    });
    return NextResponse.json({ isFav : !!fav });
  }

  const allFavorites = await prisma.userData.findMany({
    where: { image: { not: null },UserId},
  });

  return NextResponse.json(allFavorites);
}

// POST-add favorite
export async function POST(req) {
  try { 
    // const { userId } = auth();
  // if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    const {UserId, name, image, order } = await req.json();
    const pokemon = await prisma.userData.create({
      data: {UserId, name, image, order },
    });
    return NextResponse.json(pokemon);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE-remove favorite
export async function DELETE(req) {
  try {
    //  const { userId } = auth();
  // if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    const { name ,UserId } = await req.json();
    await prisma.userData.delete({ where: { UserId,name }  });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
