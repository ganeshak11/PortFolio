"use client";

import { useEffect, useState } from "react";
import { BootSequence } from "./hero/BootSequence";
import { HeroContent } from "./hero/HeroContent";

export default function Hero() {
    const [bootDone, setBootDone] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <>
            {!bootDone && <BootSequence setBootDone={setBootDone} />}
            <HeroContent isMobile={isMobile} />
        </>
    );
}
