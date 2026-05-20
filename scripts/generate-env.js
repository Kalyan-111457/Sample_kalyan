const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env file
const envConfig = dotenv.config().parsed;

if (!envConfig) {
  console.error('.env file not found or invalid');
  process.exit(1);
}

// Compose environment.ts content
const content = `export const environment = {
  production: false,
  backendApiUrl: '${envConfig.VITE_APP_BACKEND_API_URL || ''}'
};
`;

// Write to environment.ts
const targetPath = path.resolve(__dirname, '..', 'src', 'environments', 'environment.ts');

fs.writeFileSync(targetPath, content, { encoding: 'utf8' });
console.log('Generated environment.ts from .env');
