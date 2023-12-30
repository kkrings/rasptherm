export default {
  'packages/**/*.[ts,tsx,py]': (files) =>
    `nx affected -t format --files=${files.join(',')}`
}
