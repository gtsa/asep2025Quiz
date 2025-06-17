import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type BannerMode = "install" | null;

const isAndroid = () =>
  typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);

const isBrave =
  typeof navigator !== "undefined" &&
  (!!(navigator as any).brave ||
    (navigator as any).userAgentData?.brands?.some((b: any) => /Brave/i.test(b.brand)));

const isChromeMobile = () =>
  typeof navigator !== "undefined" &&
  /Chrome\/[.0-9]* Mobile/i.test(navigator.userAgent) &&
  !/EdgA|OPR|YaApp|SamsungBrowser/i.test(navigator.userAgent) &&
  !isBrave;

async function isPWAInstalled(): Promise<boolean> {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  if (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    (navigator as any).standalone === true ||
    document.referrer?.startsWith("android-app://")
  ) {
    return true;
  }

  const getRelated = (navigator as any).getInstalledRelatedApps;
  if (typeof getRelated === "function") {
    try {
      const apps = await getRelated();
      if (apps?.length) return true;
    } catch {}
  }

  return false;
}

export default function PWAInstallPrompt() {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [mode, setMode] = useState<BannerMode>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isAndroid()) return;

    (async () => {
      if (await isPWAInstalled()) {
        setMode(null);
        return;
      }

      if (isChromeMobile()) {
        const handler = (e: any) => {
          e.preventDefault();
          setDeferredPrompt(e);
          setMode("install");
        };
        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
      }
    })();
  }, []);

  const onInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const res = await deferredPrompt.userChoice;
    console.log(res.outcome === "accepted" ? "✅ installed" : "❌ dismissed");
    setMode(null);
  };

  if (mode === null) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-zinc-900 text-black dark:text-white border border-gray-300 dark:border-zinc-700 rounded-xl shadow-lg p-4 z-50 text-center text-sm sm:text-base">
      <p className="mb-3">
        {t("installLine1")} <strong>{t("title")}</strong><br />
        {t("installLine2")}
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={onInstall}
          className="bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded font-semibold hover:bg-zinc-700 dark:hover:bg-white"
        >
          {t("installButton")}
        </button>
        <button
          onClick={() => setMode(null)}
          className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 px-4 py-2 rounded font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          {t("laterButton")}
        </button>
      </div>
    </div>
  );
}
