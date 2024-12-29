export const ssr = false;

export const load = async ({ parent }) => {
  const data = await parent();
  const { znAPI } = data;
  const users = await znAPI.getSignerList();
  return {
    ...data,
    users,
  };
};
