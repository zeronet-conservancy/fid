import { connectWS, getServerInfo } from 'znapi';

export const ssr = false;

export const load = async () => {
  connectWS();
  const serverInfo = await getServerInfo();
  const baseAddr = 'http://127.0.0.1:43110';
  return {
    serverInfo,
    baseAddr,
  };
};
