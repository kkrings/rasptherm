export default {
  '**/*.{py,ts,tsx}': (fileList) => {
    const files = fileList.join(',');
    return [
      `nx affected -t format -c write --files=${files}`,
      `nx affected -t lint -c fix --files=${files}`
    ];
  }
}
