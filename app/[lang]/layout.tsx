import "../assets/scss/globals.scss";
import "../assets/scss/theme.scss";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";

import ReduxProvider from "@/components/ReduxProvider";
import AuthProvider from "@/provider/auth.provider";
import DirectionProvider from "@/provider/direction.provider";
import Providers from "@/provider/providers.client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
};

export default async function RootLayout({
                                             children,
                                             params,
                                         }: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    const { lang } = await params;

    return (
        <html lang={lang} suppressHydrationWarning>
        <body className={inter.className}>
        <Providers>
            <ReduxProvider>
                <AuthProvider>
                    <DirectionProvider lang={lang}>
                        <body className={`${inter.className} theme-${siteConfig.theme}`}>
                        {children}
                        </body>
                    </DirectionProvider>
                </AuthProvider>
            </ReduxProvider>
        </Providers>
        </body>
        </html>
    );
}
