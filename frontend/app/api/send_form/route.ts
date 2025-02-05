import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const data = await request.json()

  // Here you would typically send the data to your email service or database
  // For this example, we'll just log it and return a success response
  console.log("Form data received:", data)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json({ message: "Form submitted successfully" })
}

