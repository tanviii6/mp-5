import NewURLForm from "@/components/NewURLForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-100 to-blue-30 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-black">CS391 URL Shortener</h1>
       <p className="text-lg text-gray-700 mb-10">
          Shorten your long URLs
      </p>
      <div className="bg-white shadow-lg rounded-xl p-8">
        <NewURLForm/>
      </div>
    </div>
  );
}
