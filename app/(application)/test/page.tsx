import { createClient } from "@/lib/utils/supabase/server";

export default async function Test() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("test").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}