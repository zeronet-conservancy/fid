export const load = async ({ params, parent }) => {
  const data = await parent();

  const address = params.slug;
  return {
    ...data,
    address,
  };
};
