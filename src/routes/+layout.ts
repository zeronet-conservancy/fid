import { connect } from 'znapi';

export const ssr = false;

export const load = async () => {
  const useWS = import.meta.env.MODE === 'development';
  const znAPI = connect({ useWS });
  const baseAddr = 'http://127.0.0.1:43110'; // TODO
  return {
    znAPI,
    baseAddr,
  };
};
