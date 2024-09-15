import Link from "next/link";
import Logo01 from "@/public/img/logo.png";
import Image from "next/image";
export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Cruip">
      <Image src={Logo01} width={56} height={56} alt="" />
    </Link>
  );
}
