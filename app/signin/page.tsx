
import Auth from "@/components/Auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/options";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Page = async () => {

  return <Auth />
};

export default Page;
