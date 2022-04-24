import log, { Colour } from 'logger';

import { Handler } from '@netlify/functions';

import scrapeData, { Social } from '../../src/services/scraper';
import { updateSocialData } from '../../src/services/social-data';

const handler: Handler = async (event, context) => {
  const { clubId, social } = event.queryStringParameters;

  log(clubId, Colour.Blue);
  log(social, Colour.Blue);

  if (!clubId) {
    log('Club ID is required', Colour.Error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Club ID is required',
      }),
    };
  }

  if (!parseInt(clubId) || parseInt(clubId) === 0 || parseInt(clubId) > 20) {
    log('Club ID is invalid', Colour.Error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Club ID is invalid',
      }),
    };
  }

  if (!social) {
    log('Social Media value is required', Colour.Error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Social is required',
      }),
    };
  }

  if (!['instagram', 'linked_in', 'facebook'].includes(social)) {
    log('Social Media value is invalid', Colour.Error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid social',
      }),
    };
  }

  try {
    const scrapedData = await scrapeData(parseInt(clubId), social as Social);
    log(`Scraped Data: ${JSON.stringify(scrapedData)}`, Colour.Green);

    const data = await updateSocialData(clubId, social as Social, scrapedData);
    log(`Data: ${JSON.stringify(data)}`, Colour.Green);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data, error: false }),
    };
  } catch (error) {
    log(error, Colour.Error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };
