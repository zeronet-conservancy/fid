import { getSiteList } from 'znapi';

export const ssr = false;

export const load = async ({ parent }) => {
  const data = await parent();
  const sites = await getSiteList();
  return {
    ...data,
    sites,
  };
};
