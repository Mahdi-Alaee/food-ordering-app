import AboutUs from "@/components/large/AboutUs";
import CheckOut from "@/components/large/CheckOut";
import ContactUs from "@/components/large/ContactUs";
import Hero from "@/components/large/Hero";
import { getServerSession } from "next-auth";
import { ToastContainer } from "react-toastify";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  
  return (
    <main>
      <Hero />
      <CheckOut description="CHECK OUT" title="Our Best Sellers" />
      <AboutUs title="About us" description="OUR STORY" />
      <ContactUs title="Contact us" description="DON'T HESITATE" />
      <ToastContainer />
    </main>
  );
}
