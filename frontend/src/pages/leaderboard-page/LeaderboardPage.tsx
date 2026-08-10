import { useLeaderboard } from "@/hooks/useLeaderboard.ts";

export const LeaderboardPage = () => {
  const { leaderboard, leaderboardError, leaderboardLoading } =
    useLeaderboard();

  if (leaderboardLoading) {
    return;
  }

  return (
    <>
      {leaderboardError && <>{leaderboardError.message}</>}
      <table>
        <caption>leaderboard</caption>
        <thead>
          <tr>
            <th scope="col">Ranking</th>
            <th scope="col">Player</th>
            <th scope="col">Record</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard &&
            leaderboard.map((entry) => (
              <tr key={entry.rank}>
                <th scope="row">{entry.rank}</th>
                <td>{entry.player}</td>
                <td>{entry.record}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
