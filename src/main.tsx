import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "@/components/Providers.tsx";

async function enableMocking() {
  const { worker } = await import("@/mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

const root = createRoot(document.getElementById("root")!);

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>
  );
});
