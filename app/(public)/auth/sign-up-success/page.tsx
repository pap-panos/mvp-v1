import { useTranslation } from "@/hooks/useTranslation";
const SignupSuccessPage = () => {
  const t = useTranslation();
  return (
    <main className="mb-auto mt-20 bg-base-200 rounded-box w-sm border-base-200 p-4">
      <div className="flex-col">
        <h1 className="text-3xl font-bold p-2">{t.signupThanks}</h1>
        <p className="text-lg p-2">{t.emailConfirm}</p>
        <p className="text-md p-2 mt-4">{t.emailConfirmDesc}</p>
      </div>
    </main>
  );
};

export default SignupSuccessPage;
