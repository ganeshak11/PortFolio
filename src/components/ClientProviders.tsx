"use client";

import { LazyMotion, MotionConfig, domMax } from "framer-motion";

// domMax (not domAnimation): the navbar island morphs with layout animations.
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
