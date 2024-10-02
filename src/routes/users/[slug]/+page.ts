import { getUserData } from '$lib/zero';

export const ssr = false;

export const load = async ({ params, parent }) => {
  const data = await parent();
  const address = params.slug;
  const userdata = await getUserData(address);
  const size = 100;
  const dataLastWeek = 200;
  const user = {
    username: userdata.username,
    name: userdata.name,
  };
  return {
    ...data,
    address,
    size,
    user,
    dataLastWeek,
  };
};
