import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

export async function POST(req: { json: () => any }) {
  const body = await req.json();
  // console.log(body);
  const { email = "", password = "" } = body || {};

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return NextResponse.json(
      { status: "success", message: `User created: ${userCredential.user}` },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
