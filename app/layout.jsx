import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "NEUROVEX 2K26 – Intercollegiate IT Fest",
    description:
        "NEUROVEX 2K26 is the annual Intercollegiate IT Fest by the Department of MCA. Join us for Coding, Debugging, IT Quiz, Treasure Hunt, Gaming, and more!",
    keywords:
        "NEUROVEX, IT Fest, Intercollegiate, MCA, Coding, Debugging, Tech Fest, 2026",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#00d4ff" />
            </head>
            <body>
                <Navbar />
                <main style={{ paddingTop: "70px", minHeight: "100vh" }}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
