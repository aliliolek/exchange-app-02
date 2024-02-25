import { getXataClient } from '@/xata';
import React from 'react';

export default async function DashboardPage() {
  const xataClient = getXataClient();
  const folders = await xataClient.db.folders.getMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-7xl">Dashboard Page</h1>
      <ul>
        {folders.map((folder) => {
          return <li key={folder.id}>{folder.name}</li>;
        })}
      </ul>
    </main>
  );
}
