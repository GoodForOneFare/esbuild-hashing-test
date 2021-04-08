async function runner() {
  const a = await import('./async-import-a');
  console.log(a);
};

runner();

export {};
