export default {
  '**/*.{py,ts,tsx}': (files) => `nx affected -t format --files=${files.join(',')}`
}
