"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Evita problemas de hidratação aguardando a montagem no cliente
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Evita renderizar tema errado antes da montagem
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}