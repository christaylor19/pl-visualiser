import useFetch, { FetchStatus } from '../useFetch';

interface UseGetSubscribers {
  status: FetchStatus;
  data: any;
}

const useGetFacebookFollowers = (): UseGetSubscribers => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const {
    status,
    data: { data },
  } = useFetch('https://benevolent-paletas-1b1245.netlify.app/.netlify/functions/get-socials?social=facebook', options);
  return { status, data };
};

export default useGetFacebookFollowers;
