import jwtDecode from "jwt-decode";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl.clone();

  const authToken = request.cookies.quiztoken;

  if (request.page.name === "/login" || request.page.name === "/register") {
    url.pathname = "/on-board";

    if (authToken) {
      //Match Token With Our Secret Key
      try {
        let decodedToken = jwtDecode(authToken);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          console.log("Time expired");
          return NextResponse.next();
        } else {
          return NextResponse.redirect(url);
        }
      } catch (err) {
        console.log("err", err);
        return NextResponse.next();
      }
    } else {
      console.log("No token");
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
