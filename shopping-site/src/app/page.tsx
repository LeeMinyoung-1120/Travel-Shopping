import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Travel Pick</h1>

      <Link href="/cart">장바구니로 이동</Link>
    </div>
  );
}