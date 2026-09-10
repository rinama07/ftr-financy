import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import { PageLayout } from "./PageLayout";
import { PageRoutes } from "./PageRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PageLayout>
        <PageRoutes />
      </PageLayout>
    </BrowserRouter>
  </StrictMode>,
);
