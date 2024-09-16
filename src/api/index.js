import supabase from "@/plugins/supabase";

export async function getPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select()
    .order("win", { ascending: false })
    .order("lose", { ascending: true });
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
    .update({ name })
    .eq("id", id);
  return;
}

export async function deletePlayer(id) {
  const { data, error } = await supabase.from("players").delete().eq("id", id);
  return;
}

export async function getMatches({ pageParam = 0 }) {
  const { data, error } = await supabase
    .from("matches")
    .select(
      `
    id,
    created_at,
    win_team,
    player1:players!matches_player_1_fkey (
      name
    ),
    player2:players!matches_player_2_fkey (
      name
    ),
    player3:players!matches_player_3_fkey (
      name
    ),
    player4:players!matches_player_4_fkey (
      name
    )
  `
    )
    .order("id", { ascending: false })
    .range(pageParam, pageParam + 9);
  return data;
}

export async function getMatchDetail(id) {
  const { data, error } = await supabase
    .from("matches")
    .select(
      `
    id,
    created_at,
    win_team,
    player1:players!matches_player_1_fkey (
      id,
      name,
      win,
      lose
    ),
    player2:players!matches_player_2_fkey (
      id,
      name,
      win,
      lose
    ),
    player3:players!matches_player_3_fkey (
      id,
      name,
      win,
      lose
    ),
    player4:players!matches_player_4_fkey (
      id,
      name,
      win,
      lose
    )
  `
    )
    .eq("id", id);
  return data;
}

export async function createMatch({ player_1, player_2, player_3, player_4 }) {
  const { data, error } = await supabase
    .from("matches")
    .insert([{ player_1, player_2, player_3, player_4 }]);
}

export async function updateMatch({ id, winTeam, data }) {
  try {
    console.log(data);
    const player1Update =
      winTeam === 1
        ? { win: data.player1.win + 1 }
        : { lose: data.player1.lose + 1 };
    const player2Update =
      winTeam === 1
        ? { win: data.player2.win + 1 }
        : { lose: data.player2.lose + 1 };
    const player3Update =
      winTeam === 2
        ? { win: data.player3.win + 1 }
        : { lose: data.player3.lose + 1 };
    const player4Update =
      winTeam === 2
        ? { win: data.player4.win + 1 }
        : { lose: data.player4.lose + 1 };

    await Promise.all([
      supabase.from("matches").update({ win_team: winTeam }).eq("id", id),
      supabase.from("players").update(player1Update).eq("id", data.player1.id),
      supabase.from("players").update(player2Update).eq("id", data.player2.id),
      supabase.from("players").update(player3Update).eq("id", data.player3.id),
      supabase.from("players").update(player4Update).eq("id", data.player4.id),
    ]);

    return;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMatch(id) {
  const { data, error } = await supabase.from("matches").delete().eq("id", id);
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
