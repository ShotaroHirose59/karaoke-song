import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import Image from "next/image";
import { SongForm } from "../components/song/Form";
import { SongList } from "../components/song/List";
import { useMutateUser } from "../hooks/useMutateUser";
import { LoadingMessasge } from "../components/LoadingMessage";
import { useSongStore } from "../store/song";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id
  const { deleteUserMutation } = useMutateUser()
  const { activeTab } = useSongStore()

  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
        <p className="mt-2">(アカウント削除できます)</p>
      </Layout>
    );
  }
  return (
    <Layout title="Karaoke Song">
      <Image
        src={session?.user?.image || '/favicon.ico'}
        alt="Picture of the author"
        width={80}
        height={80}
        className="rounded-full"
      />
      <div className="flex">
        <p className="my-3 text-xl font-bold">{session?.user?.name}のレパートリー</p>
      </div>
      <div className="my-8">
        <SongList />
      </div>
      {activeTab === 'all' && (
        <div className="my-8">
          <SongForm />
        </div>
      )}
      <div className="my-8">
        <span className="h-8 w-16 my-2 mx-2 cursor-pointer text-blue-600" onClick={() => signOut()}>ログアウト</span>
        {userId && (
          <span
            className="h-8 w-16 my-2 mx-2 cursor-pointer text-red-600"
            onClick={() => deleteUserMutation.mutate({ userId })}
          >
            アカウント削除
        </span>
        )}
        {deleteUserMutation.isLoading && (
          <div className="text-center">
            <LoadingMessasge message="削除中" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
