import { rest } from 'msw';

import { getFacebookFollowersMock } from './responses/facebook/getFollowers';
import { getInstaFollowersMock } from './responses/instagram/getFollowers';
import { getLinkedInFollowersMock } from './responses/linkedin/getFollowers';
import getSubreddit from './responses/reddit/getSubreddit';
import getByUsernameData from './responses/twitter/getByUsername';
import getSubscribers from './responses/youtube/getSubscribers';

export const handlers = [
  rest.get(
    '/twitter?username=:usernames&user.fields=public_metrics',
    (req, res, ctx) => {
      return res(ctx.json({ data: getByUsernameData }));
    }
  ),
  rest.get('/reddit/r/:subreddit/about.json', (req, res, ctx) => {
    const { subreddit } = req.params;
    return res(ctx.json(getSubreddit(subreddit as string)));
  }),
  rest.get(
    '/youtube?id=:id&key=:key&part=id,statistics,snippet',
    (req, res, ctx) => {
      return res(
        ctx.json({
          kind: 'youtube#channelListResponse',
          etag: 'qorIDyQ7768o9Eoa44a44QCc_lo',
          pageInfo: {
            totalResults: 20,
            resultsPerPage: 5,
          },
          items: getSubscribers,
        })
      );
    }
  ),
  rest.get('socials', (req, res, ctx) => {
    const social = req.url.searchParams.get('social')
    switch (social) {
      case 'instagram':
        return res(ctx.json(getInstaFollowersMock));
      case 'facebook':
        return res(ctx.json(getFacebookFollowersMock));
      case 'linked_in':
        return res(ctx.json(getLinkedInFollowersMock));
      default:
        break;
    }
  }),

];
