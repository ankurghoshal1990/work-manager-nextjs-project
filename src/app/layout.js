import { Inter } from "next/font/google";
import "./globals.css";
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import 'react-toastify/ReactToastify.min.css';
import { ToastContainer } from "react-toastify";
import UserProvider from "@/context/userProvider";

const inter = Inter({ subsets: ["latin"]});

export const metadata = {
  title: "Home: Work Manager",
  description: "Application to manage all your works"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`dark:bg-gray-800 ${inter.className}`}>
        <UserProvider>
          <ToastContainer />
          <CustomNavbar />
          <div className="mt-2 mb-2">{children}</div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
