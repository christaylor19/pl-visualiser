import { useEffect, useState } from 'react';

import { ClubData } from '@/types/clubs';
import { ClubMetadata } from '@/types/config';
import { mapFromScrapedData, mapFromTwitterData, mapFromYouTubeData } from '@/utils/mapData';

import useGetFacebookFollowers from './facebook/useGetFollowers';
import useGetInstaFollowers from './instagram/useGetFollowers';
import useGetLinkedInFollowers from './linkedin/useGetFollowers';
import useGetRedditSubscribers from './reddit/useGetSubscribers';
import useGetByUsername from './twitter/useGetByUsername';
import useGetSubscribers from './youtube/useGetSubscribers';

export type SocialData = {
  instagram: ClubData[];
  facebook: ClubData[];
  linkedin: ClubData[];
  twitter: ClubData[];
  reddit: ClubData[];
  youtube: ClubData[];
};

interface UseGetSocials {
  data: SocialData;
}

const useGetSocials = (clubs: ClubMetadata[]): UseGetSocials => {
  const [socialData, setSocialData] = useState<SocialData>({
    instagram: [],
    facebook: [],
    linkedin: [],
    twitter: [],
    reddit: [],
    youtube: [],
  });

  const { data: instaData, status: instaStatus } = useGetInstaFollowers();

  const { data: fbData, status: fbStatus } = useGetFacebookFollowers();

  const { data: linkedinData, status: linkedinStatus } = useGetLinkedInFollowers();

  const { data: twitterData, status: twitterStatus } = useGetByUsername(
    clubs.map((i) => i.twitter.name.toLowerCase())
  );

  const { data: redditData, status: redditStatus } = useGetRedditSubscribers(
    clubs.map((i) => i.reddit.subreddit)
  );

  const { data: youtubeData, status: youtubeStatus } = useGetSubscribers(
    clubs.map((i) => i.youtube.channel)
  );

  useEffect(() => {
    if (instaStatus === 'fetched' && instaData) {
      setSocialData({
        instagram: mapFromScrapedData(instaData, 'instagram'),
        facebook: socialData.facebook,
        linkedin: socialData.linkedin,
        twitter: socialData.twitter,
        reddit: socialData.reddit,
        youtube: socialData.youtube,
      });
    }
  }, [instaData, instaStatus]);

  useEffect(() => {
    if (fbStatus === 'fetched' && fbData) {
      setSocialData({
        instagram: socialData.instagram,
        facebook: mapFromScrapedData(fbData, 'facebook'),
        linkedin: socialData.linkedin,
        twitter: socialData.twitter,
        reddit: socialData.reddit,
        youtube: socialData.youtube,
      });
    }
  }, [fbData, fbStatus]);

  useEffect(() => {
    if (linkedinStatus === 'fetched' && linkedinData) {
      setSocialData({
        instagram: socialData.instagram,
        facebook: socialData.facebook,
        linkedin: mapFromScrapedData(linkedinData, 'linkedin'),
        twitter: socialData.twitter,
        reddit: socialData.reddit,
        youtube: socialData.youtube,
      });
    }
  }, [linkedinData, linkedinStatus]);

  useEffect(() => {
    if (twitterStatus === 'fetched' && twitterData) {
      setSocialData({
        instagram: socialData.instagram,
        facebook: socialData.facebook,
        linkedin: socialData.linkedin,
        twitter: mapFromTwitterData(twitterData),
        reddit: socialData.reddit,
        youtube: socialData.youtube,
      });
    }
  }, [twitterData, twitterStatus]);

  useEffect(() => {
    if (redditStatus === 'fetched' && redditData) {
      setSocialData({
        instagram: socialData.instagram,
        facebook: socialData.facebook,
        linkedin: socialData.linkedin,
        twitter: socialData.twitter,
        reddit: redditData,
        youtube: socialData.youtube,
      });
    }
  }, [redditData, redditStatus]);

  useEffect(() => {
    if (youtubeStatus === 'fetched' && youtubeData) {
      setSocialData({
        instagram: socialData.instagram,
        facebook: socialData.facebook,
        linkedin: socialData.linkedin,
        twitter: socialData.twitter,
        reddit: socialData.reddit,
        youtube: mapFromYouTubeData(youtubeData),
      });
    }
  }, [youtubeData, youtubeStatus]);

  return {
    data: socialData,
  };
};

export default useGetSocials;
