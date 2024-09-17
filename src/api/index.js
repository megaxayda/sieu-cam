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

export async function deleteMatch({ id, data }) {
  try {
    if (data.win_team) {
      const winTeam = data.win_team;
      const player1Update =
        winTeam === 1
          ? { win: data.player1.win - 1 }
          : { lose: data.player1.lose - 1 };
      const player2Update =
        winTeam === 1
          ? { win: data.player2.win - 1 }
          : { lose: data.player2.lose - 1 };
      const player3Update =
        winTeam === 2
          ? { win: data.player3.win - 1 }
          : { lose: data.player3.lose - 1 };
      const player4Update =
        winTeam === 2
          ? { win: data.player4.win - 1 }
          : { lose: data.player4.lose - 1 };

      await Promise.all([
        supabase
          .from("players")
          .update(player1Update)
          .eq("id", data.player1.id),
        supabase
          .from("players")
          .update(player2Update)
          .eq("id", data.player2.id),
        supabase
          .from("players")
          .update(player3Update)
          .eq("id", data.player3.id),
        supabase
          .from("players")
          .update(player4Update)
          .eq("id", data.player4.id),
      ]);
    }

    await supabase.from("matches").delete().eq("id", id);

    return;
  } catch (error) {
    console.log(error);
  }
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

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return;
}

export async function getReportByDate(date = "2024-09-16") {
  try {
    let startDate = new Date(date);

    // set 00:00 of that day
    startDate.setHours(0, 0, 0, 0);

    let endDate = new Date(startDate);

    // set 23:59 of that day
    endDate.setHours(23, 59, 59, 999);

    // format to same format
    startDate = startDate.toISOString();
    endDate = endDate.toISOString();

    const { data, error } = await supabase
      .from("matches")
      .select(
        `
        id,
        created_at,
        win_team,
        player_1,
        player_2,
        player_3,
        player_4,
        player1:players!matches_player_1_fkey (
          id,
          name
        ),
        player2:players!matches_player_2_fkey (
          id,
          name
        ),
        player3:players!matches_player_3_fkey (
          id,
          name
        ),
        player4:players!matches_player_4_fkey (
          id,
          name
        )`
      )
      .gte("created_at", startDate)
      .lte("created_at", endDate);

    // const sample = [
    //   {
    //     id: 4,
    //     created_at: "2024-09-16T14:20:27.817621+00:00",
    //     player_1: 8,
    //     player_2: 9,
    //     player_3: 5,
    //     player_4: 7,
    //     win_team: 1,
    //   },
    //   {
    //     id: 5,
    //     created_at: "2024-09-16T14:26:41.920357+00:00",
    //     player_1: 5,
    //     player_2: 8,
    //     player_3: 7,
    //     player_4: 9,
    //     win_team: 2,
    //   },
    //   {
    //     id: 6,
    //     created_at: "2024-09-16T15:40:46.740289+00:00",
    //     player_1: 5,
    //     player_2: 8,
    //     player_3: 7,
    //     player_4: 11,
    //     win_team: 2,
    //   },
    //   {
    //     id: 7,
    //     created_at: "2024-09-16T15:42:52.882386+00:00",
    //     player_1: 5,
    //     player_2: 7,
    //     player_3: 8,
    //     player_4: 10,
    //     win_team: 2,
    //   },
    //   {
    //     id: 8,
    //     created_at: "2024-09-16T16:28:22.968801+00:00",
    //     player_1: 5,
    //     player_2: 7,
    //     player_3: 8,
    //     player_4: 9,
    //     win_team: 1,
    //   },
    //   {
    //     id: 9,
    //     created_at: "2024-09-16T16:36:10.964217+00:00",
    //     player_1: 5,
    //     player_2: 9,
    //     player_3: 7,
    //     player_4: 8,
    //     win_team: 2,
    //   },
    //   {
    //     id: 10,
    //     created_at: "2024-09-16T16:41:59.447912+00:00",
    //     player_1: 8,
    //     player_2: 7,
    //     player_3: 5,
    //     player_4: 10,
    //     win_team: 2,
    //   },
    // ];

    // for each player in sample, count how many did they win and lose
    const players = {};
    const playerWinLose = {};

    data.forEach((match) => {
      players[match.player_1] = players[match.player_1];
      players[match.player_2] = players[match.player_2];
      players[match.player_3] = players[match.player_3];
      players[match.player_4] = players[match.player_4];

      if (match.win_team === 1) {
        if (!playerWinLose[match.player_1]) {
          playerWinLose[match.player_1] = {
            win: 0,
            lose: 0,
            name: match.player1?.name,
            id: match.player1?.id,
          };
        }
        if (!playerWinLose[match.player_2]) {
          playerWinLose[match.player_2] = {
            win: 0,
            lose: 0,
            name: match.player2?.name,
            id: match.player2?.id,
          };
        }
        if (!playerWinLose[match.player_3]) {
          playerWinLose[match.player_3] = {
            win: 0,
            lose: 0,
            name: match.player3?.name,
            id: match.player3?.id,
          };
        }
        if (!playerWinLose[match.player_4]) {
          playerWinLose[match.player_4] = {
            win: 0,
            lose: 0,
            name: match.player4?.name,
            id: match.player4?.id,
          };
        }

        playerWinLose[match.player_1].win += 1;
        playerWinLose[match.player_2].win += 1;
        playerWinLose[match.player_3].lose += 1;
        playerWinLose[match.player_4].lose += 1;
      }
    });
    return Object.values(playerWinLose).sort((a, b) => b.win - a.win);
  } catch (error) {
    console.log(error);
  }
}
