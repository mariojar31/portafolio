// src/pages/api/getGreeting.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../utils/edgeConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const greeting = await client.get('greeting');
    res.status(200).json({ greeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch greeting' });
  }
}
