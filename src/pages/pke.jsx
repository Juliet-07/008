import React from "react";

const PKE = () => {
  const pkeMenu = [
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/Ee34zZBWTA9MpT37NDBgUJMB7wa0p-uGXy6B2cqBnjEvbA?e=Ky3fI9",
      title: "Agribusiness Financing",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/ERl2mahBCTVPtKlTg1ZZ-MAB4Lskp5N54azVzckz9jKOZA?e=r18smz",
      title: "Attitude 101",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/EffSRQOA111Hka9iMM2j4j8B6_V0YI_sTjq-jzMu-YNZBw?e=slCvN1",
      title: "Business Facilitation Act 2023",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/EUK8ka-5PddFuZkUw-UT-_0BEMDZP-rX1_27DqrbV7qziA?e=5dBPtj",
      title: "Cashless Policy & Naira Redesign",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/ESsOCbvpTwlAhRUqK2DdhSgB6rdehhnTZtXUAMYCww_uvg?e=4tVfUp",
      title: "Code of Conduct & Ethics",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/Ea_ef9gCmpFCup4fqDiNLsMB_FokgFL6SSf71hxYebdajw?e=UAEN8E",
      title: "Customer Experience Management",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/EVIYuNm-AuBFjF2CIC3QAIMBXJnEaRfUzuCNmQnMv24pdg?e=7HT3bR",
      title: "Dresscode",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/EXe5Sw2pcxxMrI5-lVfeAFQB8kmBaYEFjc0nll_GdT-wPA?e=Y5xFj3",
      title: "Information & Cyber Security Awareness",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/EXTZPgDN3n9Du52kFI9u17YBfZJRFMakg0M1aSX7cU2STQ?e=BMtnqz",
      title: "Information Security (ISMS) Awareness",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/EWM1ByiHTXRNlrm-83YLnQoBvxT-xYHLN_yMBrp7l0gSnQ?e=WopBZy",
      title: " IT Service Desk",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/EdOr9XSzxzlIiYu1TCbgLZYBgUUoGhcOLwaKOda7OmA8qg?e=7QfvXf",
      title: " Learning & Development",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/ER4MeD_cEI9Hqhd1Z7UXG5YBklS2Xm_0fUj_nYW2Tccd_A?e=g26piH",
      title: " Leave Management",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:b:/p/juliet_ohankwere/EaRbAEwvU6VMqdogw5QkfpUBZWeuo4skZpvk9urmkeN1lA?e=7gfGW9",
      title: " NDPR Awareness Workshop",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:b:/p/juliet_ohankwere/EfQsigIzDxFHs9RuegkPV5YB_vc4PF2asKDL755qv42iIw?e=cbbxzJ",
      title: "PCIDSS",
    },
    {
      path: "https://premiumtrustbank-my.sharepoint.com/:p:/p/juliet_ohankwere/ESQHgorpqnpOtoAzTdbkkf0BEh-b29zcc_O08WF3UiTccg?e=c8Vdlq",
      title: "Performance Driven Bank",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center my-4 font-bold text-xl uppercase">
        premium knowledge exchange 2023
      </div>
      <div className="w-full h-full">
        <div className="grid grid-cols-3 gap-10 text-lg font-medium m-10">
          {pkeMenu.map((menu) => (
            <a href={menu.path} target="_blank" rel="noopener noreferrer">
              <div className="w-full h-16 bg-gray-400/50 flex items-center justify-center rounded-lg">
                {menu.title}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default PKE;
