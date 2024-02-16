import { NextResponse } from "next/server";
import {
  signInWithEmailAndPassword,
  updateEmail,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth } from "../../firebase.config";

export async function POST(req: { json: () => any }) {
  const body = await req.json();
  // console.log(body);
  const { email = "", password = "", new_email = "" } = body || {};

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    await verifyBeforeUpdateEmail(userCredential.user, new_email);
    // await updateEmail(userCredential.user, new_email);
    return NextResponse.json(
      { status: "success", message: `User created: ${userCredential.user}` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    if (error instanceof Error)
      return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
