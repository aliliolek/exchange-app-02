import TestFirebase from '@/components/TestFirebase/TestFirebase';
import { TestXata } from '@/components/TestXata/TestXata';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12">
      <section className="w-full ">
        <h1 className="font-bold text-5xl lg:text-6xl py-6 text-center">
          Home Page
        </h1>
        <p className="font-semibold text-md lg:text-xl text-center">
          Buy and sell Bitcoin, Ethereum, XRP and many more cryptocurrencies
          using fiat or crypto.
        </p>
      </section>
      <section className="w-full max-w-lg p-6">
        <TestXata />
        <TestFirebase />
      </section>
    </main>
  );
}
