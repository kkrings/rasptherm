export default {
  '**/*.{py,ts,tsx}': (files) =>
    `nx affected -t format:write,lint:fix --files=${files.join(',')}`
}
