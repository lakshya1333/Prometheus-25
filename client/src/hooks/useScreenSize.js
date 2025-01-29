import { useState, useEffect } from "react";

const useScreenSize = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    useEffect(() => {
        const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 1200);

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return isSmallScreen;
};

export default useScreenSize;
