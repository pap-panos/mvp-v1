import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForgotPasswordForm from "@/components/forgot-password-form";
const ForgotPassword = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-base-300">
      <Navbar />
      <ForgotPasswordForm />
      <Footer />
    </div>
  );
};

export default ForgotPassword;
