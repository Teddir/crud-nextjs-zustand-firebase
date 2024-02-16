import { NextResponse } from "next/server";
import app, { auth } from "../../firebase.config";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
const firestore = getFirestore(app);

export async function GET(req: any) {
  const uid = req.nextUrl.searchParams.get("uid");

  try {
    let docUser = await getDoc(doc(firestore, `user/`, uid));
    if (!docUser.exists()) throw new Error("User not found");
    return NextResponse.json(
      {
        status: "success",
        datas: docUser.data(),
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
export async function POST(req: Request) {
  const body = await req.json();
  const { uid = "", username = "" } = body || {};

  try {
    await updateDoc(doc(firestore, `user`, uid), {
      username,
      updated_at: serverTimestamp(),
    });
    return NextResponse.json(
      { status: "success", message: `User updated: ${username}` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    if (error instanceof Error)
      return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  const body = await req.json();
  const { email = "", password = "" } = body || {};

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    await deleteUser(userCredential.user);
    await deleteDoc(doc(firestore, `user/`, userCredential.user?.uid));

    return NextResponse.json(
      { status: "success", message: `User deleted: ${email}` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    if (error instanceof Error)
      return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
