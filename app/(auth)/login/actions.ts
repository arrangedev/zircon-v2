'use server'

import { createClient } from '@/lib/utils/supabase/server'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation'

export async function login(email: string) {
  const supabase = createClient();

  const origin = headers().get('origin');
  console.log(origin);

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/home`,
    },
  });

  if (error) {
    redirect('/error')
  }
}

export async function loginWithGithub() {
  const supabase = createClient();

  const origin = headers().get('origin');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });

  if (error) {
    console.log(error);
    redirect('/error')
  } else {
    redirect(data.url);
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const origin = headers().get('origin');

  const { error } = await supabase.auth.signInWithOtp({
    email: formData.get('email') as string,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/home`,
    },
  });

  if (error) {
    redirect('/error')
  }
}

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect("/");
}