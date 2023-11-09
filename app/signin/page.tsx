import Auth from "@/components/Auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/options";

const Page = async () => {

  // const session = await getServerSession(authOptions);

  // if (session) redirect('/')

  return <Auth></Auth>
};

export default Page;
