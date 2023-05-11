import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, phoneNumber, image } = body;

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      phoneNumber,
      name,
      image,
    },
  });

  return NextResponse.json(user);
}
