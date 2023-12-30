export default {
  '**/*.{py,ts,tsx}': (files) =>
    `nx affected -t lint format:check --files=${files.join(',')}`
}
