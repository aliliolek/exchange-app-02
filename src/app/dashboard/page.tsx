import { getXataClient } from '@/xata';
import { useUser } from '@clerk/nextjs';
import React from 'react'
import FolderForm from './FolderForm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(5),
});


export default async function DashboardPage() {
  const xataClient = getXataClient();
  const folders = await xataClient.db.folders.getMany();

  async function createFolder(formData: FormData) {
    'use server';
    const parsedForm = schema.parse({
        name: formData.get('name'),
    })

    const xataClient = getXataClient();
    await xataClient.db.folders.create(parsedForm);
    revalidatePath('/');
}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-7xl">Dashboard Page</h1>
      <FolderForm  handleCreateFolder={createFolder}/>
      <ul>
      {folders.map((folder) => {
        return (
          <li
            key={folder.id}
          >
            {folder.name}
          </li>
        );
      })}
      </ul>
    </main>
  )
};
