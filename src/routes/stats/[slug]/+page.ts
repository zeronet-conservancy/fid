export const load = async ({ params, parent }) => {
  const data = await parent();
  const conn_id = Number(params.slug);
  return {
    ...data,
    conn_id,
  };
};
