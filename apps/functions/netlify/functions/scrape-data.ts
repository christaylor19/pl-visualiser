import { Handler } from '@netlify/functions';

import scrapeData, { Social } from '../../src/services/scraper';
import { updateSocialData } from '../../src/services/social-data';

const handler: Handler = async (event, context) => {
  const { clubId, social } = event.queryStringParameters;

  if (!clubId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Club ID is required',
      }),
    };
  }

  if (!parseInt(clubId) || parseInt(clubId) === 0 || parseInt(clubId) > 20) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Club ID is invalid',
      }),
    };
  }

  if (!social) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Social is required',
      }),
    };
  }

  if (!['instagram', 'linked_in', 'facebook'].includes(social)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid social',
      }),
    };
  }

  try {
    const scrapedData = await scrapeData(parseInt(clubId), social as Social);
    const data = await updateSocialData(clubId, social as Social, scrapedData);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data, error: false }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };
