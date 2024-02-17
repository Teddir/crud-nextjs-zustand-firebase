import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import app, { auth } from "../../firebase.config";

import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
const firestore = getFirestore(app);

export async function POST(req: Request) {
  const body = await req.json();
  // console.log(body);
  const { username = "", email = "", password = "" } = body || {};

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    let created_at = serverTimestamp();
    await setDoc(doc(firestore, `user`, userCredential?.user?.uid), {
      username,
      email,
      created_at,
    });

    return NextResponse.json(
      { status: "success", message: `User created: ${userCredential.user}` },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
