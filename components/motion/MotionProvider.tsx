"use client";

import { MotionConfig } from "framer-motion";

// honours the OS "reduce motion" setting for every motion component on the site
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
