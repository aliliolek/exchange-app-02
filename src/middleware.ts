// import { authMiddleware } from "@clerk/nextjs";

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// // export default authMiddleware({
// //     publicRoutes: ["/", "/contact"],
// //   });
// export default authMiddleware({
//   publicRoutes: (req) => true, // Це робить усі маршрути публічними
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { NextResponse } from 'next/server';

export async function middleware(request: any, response: any) {
  const session = request.cookies.get('session');

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  //Call the authentication endpoint
  const responseAPI = await fetch('http://localhost:3000/api/login', {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

//Add your protected routes
export const config = {
  matcher: ['/protected/:path*'],
};
