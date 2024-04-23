import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:8000/openapi.json',
  apiFile: './src/store/base.api.ts',
  apiImport: 'baseApi',
  outputFile: './src/store/sensor.api.ts',
  exportName: 'sensorApi',
  hooks: true,
  filterEndpoints: [/sensor/i],
};

export default config;
