import withSectionHeader from "@/HOFs/withSectionHeader";
import Link from "next/link";

function ContactUs() {
  return (
    <div className="text-center mb-16" id="contact">
      <Link className="underline text-4xl" href="tel:+46738123123">
        +46 738 123 123
      </Link>
    </div>
  );
}

export default withSectionHeader(ContactUs);
