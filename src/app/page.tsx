import homepageImage from "@/assets/homepage.svg";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="lg:h-screen flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-20 py-5 lg:py-0 px-5">
      {/* adding the homepage image */}
      <Image src={homepageImage} className="px-5 lg:px-0" alt="homepage" />

      {/* adding the homepage details section */}
      <section className="space-y-5 font-medium">
        <h1 className="text-2xl font-bold">
          Unlock Seamless Access with{" "}
          <span className="text-primaryColor">Auth App</span>
        </h1>
        <div className="space-y-2">
          <p>
            Empower your digital experience with Auth App – a cutting-edge,
            full-stack authentication solution built on the{" "}
            <span className="text-primaryColor font-semibold">
              robust Next.js framework
            </span>
            . Seamlessly bridging security and convenience, Auth App redefines
            how you manage user access. Elevate your application security and
            user journey through the seamless integration of login, signup, and
            role-based authentication.
          </p>

          <h3 className="text-primaryColor font-bold text-lg">Key Features</h3>
          <ul className="list-disc ml-4">
            <li>Robust Full-Stack Authentication</li>
            <li>Effortless Login and Signup</li>
            <li>Protected routes</li>
            <li>Powered by Next.js</li>
          </ul>
        </div>

        <div className="w-full flex items-center justify-center lg:block">
          <Link href={"/login"}>
            <button className=" bg-primaryColor text-white font-semibold px-5 py-2 rounded-md shadow-sm">
              Login
            </button>{" "}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default page;
