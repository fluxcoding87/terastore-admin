import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("NAME IS REQUIRED", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is req", { status: 400 });
    }
    const updatedStoreName = await db.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(updatedStoreName);
  } catch (e) {
    console.log("STORE_UPDATE_ERROR", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is req", { status: 400 });
    }
    const store = await db.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (e) {
    console.log("STORE_UPDATE_ERROR", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
