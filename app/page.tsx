
import Image from "next/image";
import { FaTools, FaDollarSign, FaUserShield } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  return (
    <main className="w-full">
      {/* Section 1: Introduction */}
      <section className="h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight max-w-3xl">
          Create & Sell Your Own Online Courses
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8 text-white/80">
          Share your knowledge, build your brand, and earn from your expertise — all in one platform.
        </p>
        <Button
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full text-lg hover:bg-gray-100 transition"
        >
          <Link href={"/auth"}> 
          Get Started / Sign In
          </Link>
        </Button>
      </section>

      {/* Section 2: Features */}
      <section className="min-h-screen bg-white py-20 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">What You Can Do Here</h2>
        <p className="text-lg text-gray-600 max-w-xl mb-12">
          Everything you need to start teaching and monetizing your content, without writing a single line of code.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl w-full">
          {[
            {
              icon: <FaTools className="text-indigo-600 text-4xl mb-4" />,
              title: "Easy Course Builder",
              desc: "Drag-and-drop editor to create video lessons, quizzes, and more.",
            },
            {
              icon: <FaDollarSign className="text-indigo-600 text-4xl mb-4" />,
              title: "Sell Your Knowledge",
              desc: "Set your price, offer subscriptions or one-time sales, and get paid.",
            },
            {
              icon: <FaUserShield className="text-indigo-600 text-4xl mb-4" />,
              title: "You Own Everything",
              desc: "Full control over your brand, your audience, and your earnings.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition text-left"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
