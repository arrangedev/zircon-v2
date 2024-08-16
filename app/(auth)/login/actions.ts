"use server";

import { getRandomAvatar } from "@/lib/get-random-avatar";
import { createClient } from "@/lib/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { generateUsername } from "unique-username-generator";

export async function login(email: string) {
  const supabase = createClient();

  const origin = headers().get("origin");

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${origin}/home`,
      data: {
        user_name: generateUsername("", 0, 15).replace(/[_-]/g, ""),
        avatar_url: getRandomAvatar(email),
      },
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }
}

export async function loginWithGithub() {
  const supabase = createClient();

  const origin = headers().get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  } else {
    redirect(data.url);
  }
}

export async function signup(email: string) {
  const supabase = createClient();

  const origin = headers().get("origin");
  const username = generateUsername("", 0, 15).replace(/[_-]/g, "");
  const avatar = getRandomAvatar(email);

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `http://localhost:3000/home`,
      data: {
        user_name: username,
        avatar_url: avatar,
      },
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }
}

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect("/");
}
