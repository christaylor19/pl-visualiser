import { ClubMetadata } from './config';

export type ClubData = {
  club: string;
  id: number | string;
  followers: number;
  clubMetadata?: ClubMetadata;
}
