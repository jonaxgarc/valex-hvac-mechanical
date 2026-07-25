"use client";

import { useEffect } from "react";

export default function LegacyScripts({ sources }: { sources: string[] }) {
  useEffect(() => {
    const scripts = sources.map((source) => {
      const script = document.createElement("script");
      script.src = source;
      script.async = false;
      document.body.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((script) => script.remove());
    };
  }, [sources]);

  return null;
}
