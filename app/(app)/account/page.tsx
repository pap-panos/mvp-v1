import { useTranslation } from "@/hooks/useTranslation";
const Account = () => {
  const t = useTranslation();
  return (
    <div className="p-4 font-bold text-xl text-center bg-base-100 rounded shadow h-screen">
      {t.account}
    </div>
  );
};

export default Account;
