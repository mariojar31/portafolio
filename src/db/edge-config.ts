import { createClient } from '@vercel/edge-config';

let edgeConfigToken = process.env.EDGE_CONFIG;

if (!edgeConfigToken) {
  edgeConfigToken=process.env.NEXT_PUBLIC_EDGE_CONFIG;
  if (!edgeConfigToken){
    throw new Error('EDGE_CONFIG is not defined');
  }
}

const client = createClient(edgeConfigToken);

export default client;