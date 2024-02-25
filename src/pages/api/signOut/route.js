// src/app/api/signOut/route.js
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  //Remove the value and expire the cookie
  const options = {
    name: 'session',
    value: '',
    maxAge: -1,
  };

  cookies().set(options);
  return NextResponse.json({}, { status: 200 });
}
