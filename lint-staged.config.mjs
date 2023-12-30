import path from 'path';

export default {
  '**/*.{py,ts,tsx}': (files) => {
    const cwd = process.cwd();
    files = files.map((file) => path.relative(cwd, file));
    return `nx affected -t format --files=${files.join(',')}`;
  }
}
