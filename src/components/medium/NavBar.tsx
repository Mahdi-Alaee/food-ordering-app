import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="hidden md:flex gap-x-8">
      <Link href="/">Home</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/#about">About</Link>
      <Link href="/#contact">Contact</Link>
    </nav>
  );
}
