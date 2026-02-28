import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "./components/theme-provider"

import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
})

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
})

export const metadata: Metadata = {
	title: "Noah Gwilliam",
	description: "Platform Engineer at Flutter UKI",
	keywords: "Platform Engineering, DevOps, Cloud Infrastructure",
	authors: [{ name: "Noah Gwilliam", url: "https://github.com/noahgwilliam" }],
	openGraph: {
		title: "Noah Gwilliam",
		description: "Platform Engineer at Flutter UKI",
		url: "https://noahgwilliam.com",
		siteName: "Noah Gwilliam",
		locale: "en_US",
		type: "website",
	},
}

if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NODE_ENV === "development") {
	// Starts a mock server that intercepts GitHub API requests and returns content from the filesystem
	const { server } = require("@/mocks")
	server.listen()
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable}`}
			style={{ scrollbarGutter: "stable" }}
			suppressHydrationWarning
		>
			<body className="font-sans antialiased flex flex-col min-h-screen">
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
					<div className="flex-1">{children}</div>

					<footer className="max-w-4xl mx-auto px-6 py-8">
						<nav className="flex items-center gap-6 text-sm">
							<a
								href="/contact"
								className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
							>
								<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
								</svg>
								Contact me
							</a>
						</nav>
					</footer>
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	)
}
