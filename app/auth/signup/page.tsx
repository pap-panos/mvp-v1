import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-base-300">
      <Navbar />
      <SignupForm />
      <Footer />
    </div>
  );
}
