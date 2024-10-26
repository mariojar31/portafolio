import { createClient } from '@vercel/edge-config';

const edgeConfigToken = process.env.EDGE_CONFIG;

if (!edgeConfigToken) {
  throw new Error('EDGE_CONFIG_TOKEN is not defined');
}

const client = createClient(edgeConfigToken);

export default client;