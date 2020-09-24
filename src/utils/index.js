export const simpleHash = (level = 3) => {
  const hash = [];
  for (let i = 1; i <= level; i++) hash.push(Math.random().toString(36).substr(2, 9));
  return hash.join('');
}