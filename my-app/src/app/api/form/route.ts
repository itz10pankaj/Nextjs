import { NextResponse } from 'next/server';
export async function GET() {
 const res = await fetch('https://pre-api-id.oto.com/insurancebox//common/getFormFields', {
    method: 'POST',
    headers: {
      'apiKey': 'agentbox-ac1faa7b-9fe9-4483-9525-5cc4ce94c639',
      'Content-Type': 'application/json',
      'Accept-Language': 'en'
    },
    body: JSON.stringify({ formType: 'lead' }),
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const data = await res.json();
  return NextResponse.json(data);
}