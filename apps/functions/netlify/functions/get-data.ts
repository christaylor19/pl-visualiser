
import { Handler } from '@netlify/functions';

import { getAllSocials } from '../../src/services/social-data';

const handler: Handler = async (event, context) => {
  try {
    const data = await getAllSocials();
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
