import supabase from "@/plugins/supabase";

export async function getPlayers() {
  const { data, error } = await supabase.from("players").select();
  return data;
}

export async function getPlayerDetail(id) {
  const { data, error } = await supabase.from("players").select().eq("id", id);
  return data;
}

export async function createPlayer(player) {
  const { data, error } = await supabase.from("players").insert(player);
  return;
}

export async function updatePlayer({ id, name }) {
  console.log(name);
  const { data, error } = await supabase
    .from("players")
    .update({ name: name })
    .eq("id", id);
  return;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return data;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return data;
}
