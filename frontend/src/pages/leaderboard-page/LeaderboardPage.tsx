import { useLeaderboard } from "@/hooks/useLeaderboard.ts";
import styles from "./LeaderboardPage.module.css";
import { formatRecord } from "@/lib/formatRecord";

export const LeaderboardPage = () => {
  const { leaderboard, leaderboardError, leaderboardLoading } =
    useLeaderboard();

  if (leaderboardLoading) {
    return;
  }

  return (
    <main className={styles.main}>
      <div className={styles.leaderboardWrapper}>
        <table className={styles.leaderboard}>
          <caption className={styles.caption}>Leaderboard</caption>
          <colgroup>
            <col className={styles.rankCol} />
            <col className={styles.playerCol} />
            <col className={styles.recordCol} />
          </colgroup>
          <thead>
            <tr className={styles.colHeaderRow}>
              <th className={styles.colHeader} scope="col">
                Ranking
              </th>
              <th className={styles.colHeader} scope="col">
                Player
              </th>
              <th className={styles.colHeader} scope="col">
                Record
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard &&
              leaderboard.map((entry) => {
                const record = formatRecord(entry.record);
                return (
                  <tr key={entry.rank} className={styles.entryRow}>
                    <th className={styles.rankCell} scope="row">
                      {entry.rank}
                    </th>
                    <td className={styles.playerCell}>{entry.player}</td>
                    <td
                      className={
                        styles.recordCell
                      }>{`${record.hours}:${record.minutes}:${record.seconds}.${record.milliseconds}`}</td>
                  </tr>
                );
              })}
            {leaderboardError && (
              <tr>
                <td
                  className="error"
                  colSpan={3}
                  style={{ textAlign: "center" }}>
                  {leaderboardError.message}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
