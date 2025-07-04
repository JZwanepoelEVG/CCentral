import React from "react";
import { Icon } from "@iconify/react";
import { Settings } from "@/components/svg";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar5 from "@/public/images/avatar/avatar-5.jpg";
const FooterMenu = () => {
    // @ts-ignore
    const session = useSelector((state) => state.session);
  return (
    <div className="space-y-5 flex flex-col items-center justify-center pb-6">
      <button className="w-11 h-11  mx-auto text-default-500 flex items-center justify-center  rounded-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
        <Settings className=" h-8 w-8" />
      </button>
      <div>


        <Image
          src={session?.user?.image || avatar5}
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />

      </div>
    </div>
  );
};
export default FooterMenu;
