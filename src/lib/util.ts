export const formatSize = (nbytes) => {
  if (nbytes === 0)
    return '0';
  if (nbytes < 1000)
    return nbytes.toString() + 'B';
  if (nbytes < 1000*1000)
    return (nbytes/1000).toFixed(1).toString() + 'K';
  if (nbytes < 1000*1000*1000)
    return (nbytes/1000/1000).toFixed(1).toString() + 'M';
  return (nbytes/1000/1000/1000).toFixed(1).toString() + 'G';
};
