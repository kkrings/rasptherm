import path from 'path';

export default {
  '**/*.{py,ts,tsx}': (fileList) => {
    const cwd = process.cwd();
    const files = Array.from(fileList, (f) => path.relative(cwd, f)).join(',');
    return [
      `nx format:write --files=${files}`,
      `nx affected -t format --files=${files}`,
      `nx affected -t lint --fix --files=${files}`,
    ];
  },
};
