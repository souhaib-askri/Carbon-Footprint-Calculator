import { ThemeProvider } from "@/components/providers/theme"
import { cn } from "@/lib/utils"
import { Node } from "@/types/client"
import { Toaster } from "@/components/ui/sonner"
import { Nunito } from 'next/font/google'
import SessionProviderClient from "@/components/providers/session"
import "@/lib/globals.css"

const nunito = Nunito({
  subsets: ['latin'],
  weight: ["200", "300", "500", "400", "600", "700", "800", "900"]
})

export default async function RootLayout({ children }: Node) {

  return (
    <html lang="en">
      <head>
        <title>Eyebase | The Eye keeps your data simple clean and secure</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/eyebase-bg.png"></link>
      </head>
      <body className={cn(nunito.className, "text-foreground h-[100svh] w-screen bg-background p-0 m-0 flex flex-col overflow-hidden !pb-0")
      }>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" />
          <SessionProviderClient>
            {children}
          </SessionProviderClient>
        </ThemeProvider>
      </body>
    </html >
  )
}
