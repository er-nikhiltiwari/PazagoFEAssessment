import { useState } from "react";

export default function useWeatherAPI() {
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    if (!city || typeof city !== "string") {
      return "⚠️ Please enter a valid city name.";
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-mastra-dev-playground": "true",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: city }],
            runId: "weatherAgent",
            maxRetries: 2,
            maxSteps: 5,
            temperature: 0.5,
            topP: 1,
            runtimeContext: {},
            threadId: 2,
            resourceId: "weatherAgent",
          }),
        }
      );

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";
      let assembledReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });

        const tokenMatches = fullText.match(/0:"([^"]+)"/g);
        if (tokenMatches) {
          assembledReply = tokenMatches
            .map((t) => t.replace(/0:"|"/g, ""))
            .join("");
        }
      }

      return assembledReply || "❌ No weather message in response.";
    } catch (err) {
      return `❌ Could not fetch weather: ${err.message}`;
    } finally {
      setLoading(false);
    }
  };

  return { fetchWeather, loading };
}
