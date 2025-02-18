import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "react-oidc-context";
import awsconfig from "./auth/aws-exports";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ThemeWrapper from "./styles/ThemeWrapper.tsx";
import { GlobalStyles } from "./styles/GlobalStyles.tsx";

import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...awsconfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>
          <GlobalStyles />
          <App />
        </ThemeWrapper>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
