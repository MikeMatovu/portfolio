import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import MountainIcon from "@/app/assets/icons/mountain-icon";
import MenuIcon from "@/app/assets/icons/menu-icon";
import Theme from "../theme";

export function Navbar() {
  const data = [
    {
      title: "About",
      href: "/#about",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Projects",
      href: "/#projects",
    },
    {
      title: "Talks",
      href: "/#talks",
    },
    {
      title: "Contact",
      href: "/#contact",
    },
  ];

  return (
    <header className="sticky top-0 shadow-sm text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-50 md:mb-28 mb-10  w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <Link
          href=""
          className="text-lg font-bold text-primary"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Portfolio</span>
        </Link>
        <nav className="hidden items-center justify-center gap-6 md:flex">
          {data.map((link, id) => (
            <Link
              key={id}
              href={link.href}
              className="font-medium dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
              prefetch={false}
            >
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Theme />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="grid gap-4 p-4">
                {data.map((link, id) => (
                  <Link
                    key={id}
                    href={link.href}
                    className=" font-medium dark:text-white text-white dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                    prefetch={false}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
