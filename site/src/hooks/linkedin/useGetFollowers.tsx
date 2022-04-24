import useFetch, { FetchStatus } from '../useFetch';

interface UseGetSubscribers {
  status: FetchStatus;
  data: any;
}

const useGetLinkedInFollowers = (): UseGetSubscribers => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const {
    status,
    data: { data },
  } = useFetch("/socials?social=linked_in", options);

  return { status, data };
};

export default useGetLinkedInFollowers;
