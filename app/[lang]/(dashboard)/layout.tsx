import SessionDispatcher from "@/components/SessionDispatcher"; // Import the client-side component
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/dictionaries";

const layout = async ({
                          children,
                          params
}: { children: React.ReactNode; params: { lang: string } } ) => {
    const { lang } = await params
    // Get session from NextAuth.js (this is a server-side operation)
    const session = await getServerSession(authOptions);

    // If no session, redirect to login page
    if (!session?.user?.email) {
        redirect("/auth/login");
    }

    // Load translations
    const trans = await getDictionary(lang as 'en' | 'bn' | 'ar');

    return (
        <DashBoardLayoutProvider trans={trans}>
            {/* Pass session as prop to the client-side component */}
            <SessionDispatcher session={session} />
            {children}
        </DashBoardLayoutProvider>
    );
};

export default layout;
