import Link from "next/link"

export default function Home() {
  return (
    <div className="flex">
      <Link href={"/dashboard"}></Link>
    </div>
  );
}
