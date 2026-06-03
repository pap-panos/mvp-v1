const SignupSuccessPage = () => {
  return (
    <main className="mb-auto mt-20 bg-base-200 rounded-box w-sm border-base-200 p-4">
      <div className="flex-col">
        <h1 className="text-3xl font-bold p-2">Thank you for signing up!</h1>
        <p className="text-lg p-2">Check your email to confirm your account</p>
        <p className="text-md p-2 mt-4">
          You&apos;ve successfully signed up. Please check your email to confirm
          your account before signing in.
        </p>
      </div>
    </main>
  );
};

export default SignupSuccessPage;
