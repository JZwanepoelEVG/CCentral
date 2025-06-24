"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { SiteLogo } from "@/components/svg";
import { useMediaQuery } from "@/hooks/use-media-query";

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});
const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const {
    reset,
    formState: {  },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "dashtail@codeshaper.net",
      password: "password",
    },
  });

  return (
    <div className="w-full py-10">
      <Link href="/" className="inline-block">
        <SiteLogo className="h-10 w-10 2xl:w-14 2xl:h-14 text-primary" />
      </Link>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello, Welcome 👋
      </div>
      <div className="2xl:text-lg mb-5 text-base text-default-600 mt-2 leading-6">
        Sign in to your account to start using Cubed Central
      </div>
      <Button
          onClick={() =>
              signIn("azure-ad", {
                  callbackUrl: "/dashboard",
              })
          }
          className="w-full"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending ? "Loading..." : "Sign In"}
      </Button>

    </div>
  );
};

export default LogInForm;
