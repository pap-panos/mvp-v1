import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpdatePasswordForm from "@/components/update-password-form";
const UpdatePasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-base-300">
      <Navbar />
      <UpdatePasswordForm />
      <Footer />
    </div>
  );
};

export default UpdatePasswordPage;
