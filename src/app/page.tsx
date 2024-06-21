import AboutUs from "@/components/large/AboutUs";
import CheckOut from "@/components/large/CheckOut";
import Hero from "@/components/large/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <CheckOut description="CHECK OUT" title="Our Best Sellers" />
      <AboutUs title="About us" description="OUR STORY" />
    </main>
  );
}
