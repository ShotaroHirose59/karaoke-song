import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import Image from "next/image";
import { SongForm } from "../components/song/Form";
import { SongList } from "../components/song/List";

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
        width={80}
        height={80}
        className="rounded-full"
      />
      <div className="flex">
        <ArrowLeftOnRectangleIcon
          className="h-8 w-16 my-2 cursor-pointer text-blue-600"
          onClick={() => signOut()}
        />
        <p className="my-3 text-xl font-bold">{session?.user?.name}のレパートリー</p>
      </div>
      <div className="my-8">
        <SongList />
      </div>
      <div className="my-8">
        <SongForm />
      </div>
    </Layout>
  );
};

export default Home;
