import { Handler, schedule } from '@netlify/functions';

import { getClubIds } from '../../src/services/clubs';
import scrapeData, { Social } from '../../src/services/scraper';
import { updateAllSocialData } from '../../src/services/social-data';

const handler: Handler = async (event, context) => {
  try {
    const data = await getClubIds();

    const items = [];

    for await (const clubId of data) {
      const scrapedSocialData: Record<Social, number> = {
        instagram: await scrapeData(clubId, 'instagram'),
        linked_in: await scrapeData(clubId, 'linked_in'),
        facebook: await scrapeData(clubId, 'facebook'),
      };

      const item = await updateAllSocialData(clubId, scrapedSocialData);
      items.push(item);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ data: items, error: false }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports.handler = schedule('@hourly', handler);
