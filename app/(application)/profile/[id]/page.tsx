import ProfileLayout from "@/components/profile/profile-layout";
import { createClient } from "@/lib/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

export default async function Profile() {
  //const pathname = usePathname();
  //console.log(pathname);
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  //const { data } = await supabase.from("users").select("*").eq("user_name", pathname);

  return (
    <>
      <button onClick={() => supabase.auth.admin.deleteUser(user.user?.id as string)}>Delete user</button>
      {/*
      <ProfileLayout user={user.user as User} />
      <pre>{JSON.stringify(user.user?.user_metadata, null, 2)}</pre>
  */}
    </>
  );
}
