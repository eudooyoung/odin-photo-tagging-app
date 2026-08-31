import { useLeaderboard } from "@/hooks/useLeaderboard.ts";
import styles from "./LeaderboardPage.module.css";
import { formatRecord } from "@/lib/formatRecord";
import { useTranslation } from "react-i18next";

export const LeaderboardPage = () => {
  const { t } = useTranslation();
  const { leaderboard, leaderboardError, leaderboardLoading } =
    useLeaderboard();

  const rankClass: Record<number, string> = {
    1: styles.firstRank,
    2: styles.secondRank,
    3: styles.thirdRank,
  };

  const entries = Array.from({ length: 10 }, (_, i) => leaderboard?.[i]);

  return (
    <main className={styles.main}>
      {leaderboardLoading && <>{t("leaderboard.loading")}</>}
      <div className={styles.leaderboardWrapper}>
        <table className={styles.leaderboard}>
          <caption className={styles.caption}>
            {t("leaderboard.title")}
          </caption>
          <colgroup>
            <col className={styles.rankCol} />
            <col className={styles.playerCol} />
            <col className={styles.recordCol} />
          </colgroup>
          <thead>
            <tr className={styles.colHeaderRow}>
              <th className={styles.colHeader} scope="col">
                {t("leaderboard.ranking")}
              </th>
              <th className={styles.colHeader} scope="col">
                {t("leaderboard.player")}
              </th>
              <th className={styles.colHeader} scope="col">
                {t("leaderboard.record")}
              </th>
            </tr>
          </thead>
          <tbody data-testid="leaderboard-body">
            {leaderboard &&
              entries.map((entry, i) => {
                const record = entry ? formatRecord(entry.record) : null;
                return (
                  <tr key={i} className={entry && rankClass[entry.rank]}>
                    <th className={styles.rankCell} scope="row">
                      {i + 1}
                    </th>
                    <td className={styles.playerCell}>{entry?.player}</td>
                    <td className={styles.recordCell}>
                      {record &&
                        `${record.hours}:${record.minutes}:${record.seconds}.${record.milliseconds}`}
                    </td>
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
