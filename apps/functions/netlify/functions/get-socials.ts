import log, { Colour } from 'logger';

import { Handler } from '@netlify/functions';

import { Social } from '../../src/services/scraper';
import { getSocials } from '../../src/services/social-data';

const handler: Handler = async (event, context) => {
  const { social } = event.queryStringParameters;

  log(social, Colour.Blue);

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
    const data = await getSocials(social as Social);
    log('Successfully retrieved social data', Colour.Green);

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
