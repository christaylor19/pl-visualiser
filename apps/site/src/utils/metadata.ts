import { metadata } from '@/config/clubs/premier-league';

export const getClubMetadataFromTwitterName = (name?: string) => {
  if (!name) return undefined;

  const club = metadata.find((i) => i.twitter.name === name);

  return club || undefined;
};
