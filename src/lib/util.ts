export const formatSize = (nbytes: number): string => {
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

export const abbrev = (s: string, n?: number): string => {
  const resN = Math.max(4, n ?? 10);
  if (resN >= s.length)
    return s;
  const left = Math.ceil((resN - 2) / 2);
  const right = s.length - Math.floor((resN - 2) / 2);
  return s.slice(0, left) + '..' + s.slice(right);
};

export const sanitizeName = (s: string): string => {
  if (s === "") {
    return "<empty>";
  }
  return s;
}
