export default {
  '**/*.{py,ts,tsx}': (fileList) => {
    const files = fileList.join(',');
    return [
      `nx format:write --files=${files}`,
      `nx affected -t format --files=${files}`,
      `nx affected -t lint --fix --files=${files}`,
    ];
  },
};
