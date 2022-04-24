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
  } = useFetch('/socials?social=facebook', options);
  return { status, data };
};

export default useGetFacebookFollowers;
