import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeHTML = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    console.log('Axios log data: ', data);
    const scraped = cheerio.load(data);
    console.log('here');

    if (url.includes('linkedin')) {
      console.log('Scraped LinkedIn');
      const x = scraped('div .org-top-card-summary-info-list__info-item');
      console.log('x: ', x.html());
      console.log('x: ', x.attr());
      console.log('x: ', x.text());
    }

    if (url.includes('instagram')) {
      console.log('Scraped Instagram');
      const x = scraped('li.Y8-fY span');
      console.log('x: ', x.html());
      console.log('x: ', x.attr());
      console.log('x: ', x.text());
      const y = scraped('meta[property="og:description"]').attr('content');
      console.log('y: ', y);
      if (y) {
        console.log('y split: ', y.split(',')[0]);
      }
    }
    return 1;
  } catch (error) {
    console.log('Error: ', error);
    return 1;
  }
};
