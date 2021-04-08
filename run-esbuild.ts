import fs from 'fs';

import  {BuildOptions, Metafile} from 'esbuild';
import * as esbuild from 'esbuild';

const config: BuildOptions = {
  bundle: true,
  entryPoints: ['./src/index.ts'],
  format: 'esm',
  incremental: true,
  logLevel: 'silent',
  metafile: true,
  minify: false,
  outdir: './dist',
  platform: 'browser',
  splitting: true,
  target: 'es2018',
};


esbuild.build(config)
  .then((result) => {
    const {distPath, content} = findAssetOutput(result.metafile, 'src/async-import-a.ts');
    console.log('async-import-a - first build output path:', distPath);
    console.log('async-import-a - first build content:\n');
    console.log(content);

    const barSrc = fs.readFileSync('./src/async-import-b.ts').toString();
    fs.writeFileSync(
      './src/async-import-b.ts',
      `${barSrc}\nconsole.log('lol');\n`,
    );

    console.log('\n******* Changing async-import-b source ***********\n')
    result.rebuild().then((result2) => {
      const {distPath, content} = findAssetOutput(result2.metafile, 'src/async-import-a.ts');
      console.log('async-import-a - second build output path:', distPath);
      console.log('async-import-a - second build content:\n');
      console.log(content);

      result2.rebuild.dispose();
    });
  })

function findAssetOutput(metafile: Metafile, inputPath: string) {
  const [distPath] = Object.entries(metafile.outputs)
    .find(([, output]) => output.entryPoint === inputPath);

  return {
    distPath,
    content: fs.readFileSync(distPath).toString(),
  }
}