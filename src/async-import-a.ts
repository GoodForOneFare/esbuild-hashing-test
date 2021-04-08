export default async function a() {
  const bar = await import('./async-import-b');
  return bar;
}