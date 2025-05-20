"use client"
import Banner from "@/components/Banner";
import Widgets from "@/components/widgets";
import { useTranslation } from 'react-i18next';
import '@/utlis/i18n'
import JsonToCsvConverter from "@/components/JsonToCsvConverter";
export default function HomePage() {
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };
  return (
    <div className="homepage-container">
      <div className="main-content">
        <div className="center-text">
          <h1>{t("welcome")}</h1>
          <p>{t("text")}</p>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {t("switch")}
          </button>
        </div>
        <div className="banner">
          <Banner
            images={[
              "/assets/footer/sample.png",
              "/assets/footer/sample.png",
              "/assets/footer/sample.png",
            ]}
            speed={30}
          />
        </div>
        <JsonToCsvConverter />
      </div>
      <div className="sidebar">
        <Widgets />
      </div>
    </div>
  );
}
