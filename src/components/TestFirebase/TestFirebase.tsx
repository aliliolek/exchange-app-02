'use client';
import { database } from '@/lib/firebase/firebase-config';
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';

export default function TestFirebase() {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const dataRef = ref(database, 'Methods');

    onValue(dataRef, (snapshot) => {
      const newData: string[] = Object.values(snapshot.val());

      setData(newData);
    });
  }, []);

  return (
    <div>
      <h2>Now I'm trying to get some data from Realtime Database-Firebase</h2>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}
