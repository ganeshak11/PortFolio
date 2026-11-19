"use client";

import { useEffect, useState } from "react";
import { HeroContent } from "./hero/HeroContent";

export default function Hero({ onTerminalOpen }: { onTerminalOpen?: () => void }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return <HeroContent isMobile={isMobile} onTerminalOpen={onTerminalOpen} />;
}
