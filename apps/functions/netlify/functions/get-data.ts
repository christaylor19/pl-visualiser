
import log, { Colour } from 'logger';

import { Handler } from '@netlify/functions';

import { getAllSocials } from '../../src/services/social-data';

const handler: Handler = async (event, context) => {
  try {
    const data = await getAllSocials();
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
