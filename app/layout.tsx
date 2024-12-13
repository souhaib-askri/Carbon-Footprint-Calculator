import { ThemeProvider } from "@/components/providers/theme"
import { cn } from "@/lib/utils"
import { Nunito } from 'next/font/google'
import "@/lib/globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator } from "lucide-react"

const nunito = Nunito({
  subsets: ['latin'],
  weight: ["200", "300", "500", "400", "600", "700", "800", "900"]
})

export default async function RootLayout({ children }: any) {

  return (
    <html lang="en">
      <head>
        {/* <title>Eyebase | The Eye keeps your data simple clean and secure</title> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn(nunito.className, "text-foreground h-[100svh] w-screen bg-background p-0 m-0 flex flex-col overflow-hidden !pb-0")
      }>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-20 w-full border-b bg-muted/20 px-5">
            <div className="flex items-center justify-between w-full mx-auto max-w-7xl  h-full">
              <Link href={"/"} className="flex items-center justify-center gap-2 font-semibold text-xl text-primary">
                <Calculator size={20} />
                Carbon Calculator
              </Link>
              <Link href={"/calculate"}>
                <Button className="rounded-full">
                  Calcule
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html >
  )
}
