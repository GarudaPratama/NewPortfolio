import React from "react";
import { useLang } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLang(); 

  const ft = t("footer"); // ⬅️ ambil object footer

  return (
    <footer className="w-full bg-[#0B1220] text-white pt-16 pb-6 px-6 md:px-16 font-helvetica">

      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0">

        {/* LEFT - CONTACT */}
        <div>
          <h3 className="text-white font-hanson tracking-wide text-[14px] mb-3">
            {ft.contactTitle}
          </h3>

          <p className="text-[11px] leading-relaxed opacity-90">
            {ft.email} <br />
            {ft.whatsapp}
          </p>
        </div>

        {/* RIGHT - SOCIAL MEDIA */}
        <div className="text-left md:text-right">
          <h3 className="text-white font-hanson tracking-wide text-[14px] mb-3">
            {ft.socialTitle}
          </h3>

          <p className="text-[11px] leading-relaxed opacity-90">
            {ft.linkedin} <br />
            {ft.instagram} <br />
            {ft.github}
          </p>
        </div>
      </div>

      {/* LOCATION */}
      <div className="mt-16 text-left">
        <p className="text-[12px] font-hanson tracking-wide">
          {ft.location}
        </p>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-4 text-center">
        <p className="text-[10px] opacity-90">
          © {new Date().getFullYear()} Garuda, {ft.copyright}
        </p>
      </div>

    </footer>
  );
};

export default Footer;
