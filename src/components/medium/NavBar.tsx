import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex gap-x-8">
      <Link href="/">Home</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/">About</Link>
      <Link href="/">Contact</Link>
    </nav>
  );
}
