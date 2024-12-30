import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/Sidebar/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Search } from "@/components/ui/Input/input";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer/Footer";
import { getNavigationData } from "@/lib/api";
import {Toaster} from "@/components/ui/sonner";
import {Up} from "@/components/Up/Up";

const halvarBreit = localFont({
  src: [
    {
      path: "./fonts/HalvarBreit-Bd.woff2",
      weight: "700",
    },
    {
      path: "./fonts/HalvarBreit-Md.woff2",
      weight: "500",
    },
  ],
  variable: "--font-halvar-breit",
  weight: "500 700"
});

const raleway = localFont({
  src: [
    {
      path: "./fonts/Raleway-Bold.woff2",
      weight: "700",
    },
    {
      path: "./fonts/Raleway-Regular.woff2",
      weight: "400",
    },
  ],
  variable: "--font-raleway",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "Coursfind",
  description: "Лучший сайт по поиску и просмотру рейтингов курсов",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navItems = await getNavigationData();

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${halvarBreit.variable} ${raleway.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid grid-rows-[1fr,auto] min-h-screen">
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="relative z-0">
                <header className="sticky backdrop-blur-lg bg-card/70 z-10 top-0 border-b flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex flex-row w-full justify-between shrink-0 p-3 items-center gap-2 container mx-auto">
                    <div className="flex gap-3 items-center">
                      <SidebarTrigger />
                      <Separator orientation="vertical" className="h-8" />
                      <Search placeholder="Курсы по Figma..." />
                    </div>
                    <div className="hidden md:block">
                      <ThemeToggle />
                    </div>
                  </div>
                </header>
                {children}
              </SidebarInset>
            </SidebarProvider>
            <Footer navItems={navItems} />
            <Toaster />
            <Up />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

