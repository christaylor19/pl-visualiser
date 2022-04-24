export type TwitterAccountData = {
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
  id: string;
  username: string;
  name: string;
};
