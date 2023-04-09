import { Inter } from "next/font/google";
import Link from "next/link";

const font = Inter({ subsets: ["latin"] });

export default function Header({ className }) {
  const nav = [];

  return (
    <header className={`sticky top-0 z-50 bg-white ${className}`}>
      <div className="max-w-3xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-xl">
          ÀKARNÁ
        </Link>
        <div className={`flex justify-end ${font.className}`}>
          {nav.map((i) => (
            <Link
              className="opacity-40 hover:bg-slate-100 hover:opacity-80 p-3 text-xs"
              key={i.path}
              href={i.path}
            >
              {i.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
