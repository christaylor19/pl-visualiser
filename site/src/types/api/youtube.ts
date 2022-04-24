type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Snippet = {
  title: string;
  description: string;
  customUrl?: string;
  publishedAt: string;
  localized: {
    title: string;
    description: string;
  };
  thumbnails: Record<string, Thumbnail>;
  country?: string;
  defaultLanguage?: string;
};

type Statistics = {
  viewCount: string;
  subscriberCount?: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
};

export type YoutubeChannel = {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
};
