import { useEffect } from "react";

type Language = "en" | "ar";

declare global {
  interface Window {
    VG_CONFIG?: {
      ID: string;
      region: string;
      render: string;
      modalMode?: boolean;
      stylesheets?: string[];
      autostart?: boolean;
      user?: {
        name?: string;
        email?: string;
        phone?: string;
      };
      userID?: string;
    };
  }
}

const CONVOCORE_AGENT_ID = "TCicuXkIPVvxdDpt";
const CONVOCORE_REGION = "na";
const CONVOCORE_BUNDLE_SRC = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
const CONVOCORE_STYLESHEET = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css";

export function ConvocoreWidget({ language = "en" }: { language?: Language }) {
  useEffect(() => {
    const renderPosition = language === "ar" ? "bottom-left" : "bottom-right";
    const container = document.getElementById("VG_OVERLAY_CONTAINER");

    if (container) {
      container.innerHTML = "";
    }

    const existingScript = document.getElementById("convocore-widget-script");
    existingScript?.remove();

    window.VG_CONFIG = {
      ID: CONVOCORE_AGENT_ID,
      region: CONVOCORE_REGION,
      render: renderPosition,
      modalMode: false,
      autostart: false,
      stylesheets: [CONVOCORE_STYLESHEET],
    };

    const script = document.createElement("script");
    script.id = "convocore-widget-script";
    script.src = CONVOCORE_BUNDLE_SRC;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [language]);

  return <div id="VG_OVERLAY_CONTAINER" style={{ width: 0, height: 0 }} data-language={language} aria-hidden="false" />;
}
