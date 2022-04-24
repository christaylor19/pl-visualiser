import { metadata } from '@/config/clubs/premier-league';
import { RedditSubData } from '@/types/api/reddit';
import { TwitterAccountData } from '@/types/api/twitter';
import { YoutubeChannel } from '@/types/api/youtube';
import { ClubData } from '@/types/clubs';
import { VisxData } from '@/types/visx';

export const mapFromTwitterData = (data: TwitterAccountData[]): ClubData[] =>
  data.map((item) => ({
    club: item.username,
    id: parseInt(item.id, 10),
    followers: item.public_metrics.followers_count,
    clubMetadata: metadata.find(
      (club) => club.twitter.id.toString() === item.id
    ),
  })) as ClubData[];

export const mapFromYouTubeData = (data: YoutubeChannel[]): ClubData[] =>
  data.map((item) => ({
    club: item.snippet.title,
    id: item.id,
    followers: parseInt(item.statistics.subscriberCount || '0', 10),
    clubMetadata: metadata.find((club) => club.youtube.channel === item.id),
  })) as ClubData[];

export const mapToVisxData = (data: ClubData[]): VisxData[] => {
  const mappedData: VisxData[] = [];
  mappedData.push({
    id: 'root',
    size: 0,
    parent: null,
  });

  data.forEach((item) => {
    mappedData.push({
      id: item.club,
      size: item.followers,
      parent: 'root',
    } as VisxData);
  });

  return mappedData;
};

export const mapFromRedditData = (data?: RedditSubData): ClubData => {
  if (!data) {
    return {
      club: 'Unknown',
      id: 'Unknown',
      followers: 0,
    };
  }

  const club = metadata.find((i) => {
    return i.reddit.subreddit === data.data?.display_name?.toLowerCase();
  });

  if (!club)
    return {
      club: data.data.display_name,
      id: data.data.id,
      followers: 0,
    };

  return {
    club: club.name,
    id: data.data.id,
    followers: data.data.subscribers,
    clubMetadata: club,
  };
};

type ScrapedData = {
  club_id: number;
  linkedin?: number;
  facebook?: number;
  instagram?: number;
};

export const mapFromScrapedData = (
  data: ScrapedData[],
  property: 'linkedin' | 'facebook' | 'instagram'
): ClubData[] => {
  const mappedData: ClubData[] = [];

  data.forEach((item) => {
    const club = metadata.find((i) => i.id === item.club_id);

    if (!club) {
      mappedData.push({
        club: 'Unknown',
        id: item.club_id,
        followers: 0,
      });
    } else {
      mappedData.push({
        club: club.name,
        id: item.club_id,
        followers: item[property] || 0,
        clubMetadata: club,
      });
    }
  });

  return mappedData;
};

export const mapToClub = (id: number) => {
  const club = metadata.find((i) => i.id === id);

  if (!club) return 'Unknown';

  return club.name;
};

export const mapToClubId = (id: number) => {
  const club = metadata.find((i) => i.id === id);

  if (!club) return 34;

  return club.apisports.id;
};
