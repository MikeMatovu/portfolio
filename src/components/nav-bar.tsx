import Image from "next/image";
import Link from "next/link";
// import Logo from "@/public/logo.png";
import Theme from "./theme";
import MobileMenu from "./mobile-menu";

export default function Navbar() {
  const data = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "#contact",
    },
  ];

  return (
    <>
      <header className="sticky top-0  text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-50 md:mb-28 mb-10  w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            {/* <Image src="" width={35} height={35} alt="logo" /> */}
            Home
          </Link>

          <nav className="md:block hidden">
            <ul className="flex items-center gap-x-8">
              {data.map((link, id) => (
                <li key={id}>
                  <Link
                    href={link.href}
                    className="font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-x-4">
            <Theme />
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
