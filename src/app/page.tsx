"use client";

import React, { useState } from "react";
import PromptInput from "../components/PromptInput";
import Loader from "../components/Loader";
import SVGPreviewGrid from "../components/SVGPreviewGrid";
import LiveMockup from "../components/LiveMockup";
import DownloadButton from "../components/DownloadButton";
import BulkDownloadButton from "../components/BulkDownloadButton";
import Notification from "../components/Notification";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [svgs, setSvgs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSvgs([]);
    setSelected(null);
    try {
      const res = await fetch("/api/generate-svg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("Failed to generate icons");
      const data = await res.json();
      const validSvgs = (data.svgs || []).filter((item: any) => item.svg).map((item: any) => item.svg);
      setSvgs(validSvgs);
      if (validSvgs.length > 0) setSelected(validSvgs[0]);
      if (data.svgs && data.svgs.some((item: any) => item.error)) {
        setError("Some icons could not be optimized and were skipped.");
      }
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Creticon Icon Generator</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>Describe your icon and generate creative SVGs powered by AI.</p>
      <PromptInput value={prompt} onChange={setPrompt} onSubmit={handleSubmit} />
      {error && <Notification message={error} type="error" />}
      {loading && <Loader />}
      {!loading && svgs.length > 0 && (
        <>
          <BulkDownloadButton svgs={svgs} />
          <SVGPreviewGrid svgs={svgs} onSelect={setSelected} />
          {selected && <LiveMockup svg={selected} />}
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <DownloadButton svg={selected!} filename="icon.svg" />
          </div>
        </>
      )}
    </main>
  );
}
