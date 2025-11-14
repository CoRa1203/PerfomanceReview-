import "@/config/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";
import { ProvidersServer } from "./providersServer";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Logo } from "@/components/icons";
import { HeroUIProvider } from "@heroui/system";
import ProviderUser from "./providerUser";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ProvidersServer>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ProviderUser>
          <HeroUIProvider locale="ru-RU">
          <div className="relative flex flex-col h-screen ">
            <Navbar/>
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                href="/"
              >
               {/* <Logo/> */}
               <p> by 47 </p>
              </Link>
            </footer>
          </div>
          </HeroUIProvider>
          </ProviderUser>
        </Providers>
        </ProvidersServer>
      </body>
    </html>
  );
}
