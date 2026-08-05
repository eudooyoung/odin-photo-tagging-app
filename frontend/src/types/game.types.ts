export type Game = {
  id: number;
  publicId: string;
  player: string | null;
  createdAt: Date;
  finishedAt: Date | null;
  record: number | null;

  targets: {
    name: string;
    id: number;
    isFound: boolean;
  }[];
};
