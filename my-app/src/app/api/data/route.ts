import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://int-gcloud-stage.oto.com/insurancebox//common/master/config', {
    method: 'GET',
    headers: {
      'apiKey': 'agentbox-ac1faa7b-9fe9-4483-9525-5cc4ce94c639',
      'Content-Type': 'application/json',
      'app_type': 'id'
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    return new NextResponse(`Failed to fetch options: ${res.statusText}`, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
