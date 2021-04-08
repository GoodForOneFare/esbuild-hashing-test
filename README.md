### esbuild hashing demo

A simple app that demonstrates esbuild's filename hashing. Build and view significant parts of this app's output via:

```sh
yarn demo
```

Here's sample output from my first run. Note that:
* The `dist/async-import-a-2BXLH665.js` output path is consistent between builds
* ... but the file's content changes to reflect new import hashes

```
async-import-a - first build output path: dist/async-import-a-2BXLH665.js
async-import-a - first build content:

// src/async-import-a.ts
async function a() {
  const bar = await import("./async-import-b-LADCYIX7.js");
  return bar;
}
export {
  a as default
};


******* Changing async-import-b source ***********

async-import-a - second build output path: dist/async-import-a-2BXLH665.js
async-import-a - second build content:

// src/async-import-a.ts
async function a() {
  const bar = await import("./async-import-b-NYQZVG7G.js");
  return bar;
}
export {
  a as default
};```
