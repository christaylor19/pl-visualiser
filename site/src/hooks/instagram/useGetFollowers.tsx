import useFetch, { FetchStatus } from '../useFetch';

interface UseGetSubscribers {
  status: FetchStatus;
  data: any;
}

const useGetInstaFollowers = (): UseGetSubscribers => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const {
    status,
    data: { data },
  } = useFetch('/socials?social=instagram', options);

  return { status, data };
};

export default useGetInstaFollowers;
