import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    );
  }
  return (
    <Layout title="Karaoke Song">
      <Image
        src={session?.user?.image}
        alt="Picture of the author"
        width={100}
        height={100}
        className="rounded-full"
      />
      <div className="flex">
        <ArrowLeftOnRectangleIcon
          className="h-8 w-10 my-2 cursor-pointer text-blue-600"
          onClick={() => signOut()}
        />
        <p className="my-3 text-xl">{session?.user?.name}</p>
      </div>
    </Layout>
  );
};

export default Home;
