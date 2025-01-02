export const ssr = false;

export const load = async ({ params, parent }) => {
  const data = await parent();

  const address = params.slug;
  const size = 100;
  const dataLastWeek = 200;
  return {
    ...data,
    address,
    size,
    dataLastWeek,
  };
};
