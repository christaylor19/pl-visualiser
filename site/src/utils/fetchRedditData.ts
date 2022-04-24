import { RedditSubData } from '@/types/api/reddit';

const fetchRedditData = async (
  subreddit: string
): Promise<RedditSubData | void> => {
  try {
    const url = `/reddit/r/${subreddit}/about.json`;
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, options);
    const data = (await response.json()) as RedditSubData;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchRedditData;
