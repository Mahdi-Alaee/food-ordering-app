import AboutUs from "@/components/large/AboutUs";
import CheckOut from "@/components/large/CheckOut";
import ContactUs from "@/components/large/ContactUs";
import Hero from "@/components/large/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <CheckOut description="CHECK OUT" title="Our Best Sellers" />
      <AboutUs title="About us" description="OUR STORY" />
      <ContactUs title="Contact us" description="DON'T HESITATE" />
    </main>
  );
}
