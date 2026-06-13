import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return (
      <>
        <Navbar user={null} />
        {children}
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar user={user} />
        {children}
        <Footer />
      </>
    );
  }
}
