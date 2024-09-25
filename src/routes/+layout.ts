import { connectWS, getServerInfo } from '$lib/zero';

export const ssr = false;

export const load = async () => {
  connectWS();
  const serverInfo = await getServerInfo();
  return {
    serverInfo,
  };
};
