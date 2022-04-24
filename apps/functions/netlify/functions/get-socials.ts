import { Handler } from '@netlify/functions';

import { Social } from '../../src/services/scraper';
import { getSocials } from '../../src/services/social-data';

const handler: Handler = async (event, context) => {
  const { social } = event.queryStringParameters;

  console.log('Social: ', social);

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
    const data = getSocials(social as Social);
    console.log('Data: ', data);
    return {
      statusCode: 200,
      body: JSON.stringify({ data: data, error: false }),
    };
  } catch (error) {
    console.log('errpr: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };
