type Colours = {
  primary: string;
  secondary: string;
  text: string;
};

type Twitter = {
  id: number;
  name: string;
};

type APISports = {
  id: number;
};

type Reddit = {
  subreddit: string;
};

type Instagram = {
  username: string;
};

type Facebook = {
  id: string;
};

type LinkedIn = {
  id: string;
};

type Youtube = {
  channel: string;
};

export type ClubMetadata = {
  name: string;
  id: number;
  colours: Colours;
  twitter: Twitter;
  apisports: APISports;
  reddit: Reddit;
  instagram: Instagram;
  facebook: Facebook;
  linkedin: LinkedIn;
  youtube: Youtube;
};
