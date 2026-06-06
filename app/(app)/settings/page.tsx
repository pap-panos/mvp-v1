"use client";
import { useTranslation } from "@/hooks/useTranslation";
import ThemeController from "@/components/theme-controller";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Settings = () => {
  const t = useTranslation();
  return (
    <div className="flex flex-col p-4 bg-base-100 rounded shadow h-auto w-auto">
      <span className="font-bold text-md text-center">{t.settings}</span>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{t.appTheme}</th>
              <td>
                <ul className="menu rounded-box">
                  <li>
                    <ThemeController />
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th>{t.appLanguage}</th>
              <td>
                <ul className="menu rounded-box">
                  <li>
                    <LanguageSwitcher />
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
