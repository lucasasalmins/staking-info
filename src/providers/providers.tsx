"use client";

import { AppProvider } from "./AppProvider";

type Props = {
  children?: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  )
}