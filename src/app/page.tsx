import { Nav } from "@/components/Nav";
import NewOrder from "@/components/NewOrder/NewOrder";
import SelectCurrency from "@/components/SelectCurrency";
import { TransactionDetails } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12">
      <section className="w-full ">
        <h1 className="font-bold text-5xl lg:text-6xl py-6 text-center">
          Buying and selling digital assets
        </h1>
        <p className="font-semibold text-md lg:text-xl text-center">
        Buy and sell Bitcoin, Ethereum, XRP and many more
        cryptocurrencies using fiat or crypto.
        </p>
      </section>
      <section className="w-full max-w-lg p-6">
        <NewOrder />
      </section>
    </main>
  );
}
