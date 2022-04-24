import { scrapeHTML } from '../utils/scrape';
import { getClub } from './clubs';

const scrapeLinkedIn = async (clubId: number): Promise<number> => {
  const club = await getClub(clubId);
  console.log('Scraping Linked In')
  console.log('club: ', club);
  if (!club.linked_in_id) {
    throw new Error(`Club with id ${clubId} does not have a LinkedIn id`);
  }
  console.log('URL: ', `https://www.linkedin.com/in/${club.linked_in_id}/`);
  const scraped = await scrapeHTML(
    `https://www.linkedin.com/company/${club.linked_in_id}/`
  );
  console.log('scrapeLinkedIn - scraped: ', scraped);
  return scraped;
};

const scrapeInstagram = async (clubId: number): Promise<number> => {
  const club = await getClub(clubId);

  if (!club.instagram_id) {
    throw new Error(`Club with id ${clubId} does not have an Instagram id`);
  }

  const scraped = await scrapeHTML(
    `https://www.instagram.com/${club.instagram_id}/`
  );
  console.log('scrapeInstagram - scraped: ', scraped);
  return scraped;
};

const scrapeFacebook = async (clubId: number): Promise<number> => {
  const club = await getClub(clubId);

  if (!club.facebook_id) {
    throw new Error(`Club with id ${clubId} does not have a Facebook id`);
  }

  const scraped = await scrapeHTML(`https://www.facebook.com/${club.facebook_id}/`);
  console.log('scrapeFacebook - scraped: ', scraped);
  return scraped;
};

export type Social = 'linked_in' | 'instagram' | 'facebook';

const scrapeData = async (clubId: number, social?: Social) => {
  switch (social) {
    case 'linked_in': {
      const val = await scrapeLinkedIn(clubId);
      return val;
    }
    case 'instagram': {
      const val = await scrapeInstagram(clubId);
      return val;
    }
    case 'facebook': {
      const val = await scrapeFacebook(clubId);
      return val;
    }
    default:
      return 0;
  }
};

export default scrapeData;
