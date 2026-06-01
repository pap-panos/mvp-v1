import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const SignupSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-base-300">
      <Navbar />
      <div className="mb-auto mt-20 bg-base-200 rounded-box w-sm border-base-200 p-4">
        <div className="flex-col">
          <h1 className="text-3xl font-bold p-2">Thank you for signing up!</h1>
          <p className="text-lg p-2">
            Check your email to confirm your account
          </p>
          <p className="text-md p-2 mt-4">
            You&apos;ve successfully signed up. Please check your email to
            confirm your account before signing in.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupSuccessPage;
