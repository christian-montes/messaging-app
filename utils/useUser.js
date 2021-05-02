import useSWR from 'swr';
import axios from  'axios';

// fetcher function passed as second argument to useSWR hook
const fetcher = url => axios.get(url).then(res => res.data)

export function useUser() {
  // useSWR returns data as first argument
  // and optional mutate function tethered to data
  const { data, error, mutate } = useSWR('/api/user', fetcher);
  console.log(data, error)
  // data is undefined if the query has not resolved
  const loading = !data

  // optional chaining to check if user property exists
  const user = data?.user
  return [user, { mutate, loading }]
}