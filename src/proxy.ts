import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  console.log("Running proxy")
  return NextResponse.next()
}

// export const config = {
//   matcher: ["/dashboard/:path*"]
// }