import { RedditSubData } from '@/types/api/reddit';

const data = [
  {
    kind: 't5',
    data: {
      display_name: 'reddevils',
      subscribers: 326132,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'chelseafc',
      subscribers: 246640,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'liverpoolfc',
      subscribers: 335022,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'gunners',
      subscribers: 215660,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'mcfc',
      subscribers: 92468,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'coys',
      subscribers: 99041,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'everton',
      subscribers: 29733,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'lcfc',
      subscribers: 13338,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'hammers',
      subscribers: 19826,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'nufc',
      subscribers: 23162,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'avfc',
      subscribers: 13852,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'saintsfc',
      subscribers: 11296,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'crystalpalace',
      subscribers: 8308,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'wwfc',
      subscribers: 8657,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'leedsunited',
      subscribers: 21365,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'watford_fc',
      subscribers: 3989,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'norwichcity',
      subscribers: 4885,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'brightonhovealbion',
      subscribers: 4796,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'brentford',
      subscribers: 2709,
    },
  },
  {
    kind: 't5',
    data: {
      display_name: 'burnley',
      subscribers: 2174,
    },
  },
];

const getSubreddit = (subreddit: string) =>
  data.find(({ data: { display_name } }) => display_name === subreddit);

export default getSubreddit;
