import { getUserData } from '$lib/zero';

export const ssr = false;

export const load = async ({ params, parent }) => {
  const data = await parent();
  const address = params.slug;
  const user = await getUserData(address).then((userdata) => {
    return {
      username: userdata.username,
      name: userdata.name,
    };
  }).catch((error) => {
    return {
      error,
    };
  });
  const size = 100;
  const dataLastWeek = 200;
  return {
    ...data,
    address,
    size,
    user,
    dataLastWeek,
  };
};
