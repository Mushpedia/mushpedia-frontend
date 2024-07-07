import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "./utils/providers/reactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryClientProvider>
  );
}
