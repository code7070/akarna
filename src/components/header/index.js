import { selectPage } from "@/store/pageSlice";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header({ className }) {
  const nav = useSelector(selectPage.navigation) || [];

  return (
    <header className={`sticky top-0 z-50 bg-white ${className}`}>
      <div className="max-w-3xl mx-auto flex justify-between p-4">
        <div className="font-bold text-lg">ÀKARNÁ</div>
        <div className="flex justify-end gap-2">
          {nav.map((i) => (
            <Link
              className="opacity-40 hover:underline hover:opacity-80"
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
