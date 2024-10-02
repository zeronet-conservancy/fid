import { getSignerList } from '$lib/zero';

export const ssr = false;

export const load = async ({ parent }) => {
  const data = await parent();
  const users = await getSignerList();
  return {
    ...data,
    users,
  };
};
