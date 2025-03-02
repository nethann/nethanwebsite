
// For scolling disabling 3-D model rotation for .5 seconds. Reason programmed because of mobile responsiveness. 

import { useState, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

export default function ControlledOrbitControls({ enableRotate, enableZoom }) {
    const [controlsEnabled, setControlsEnabled] = useState(true);
    let timeoutId = null; 

    const modelRotateSpeed = 0.3

    useEffect(() => {
        const disableControls = () => {
            setControlsEnabled(false);

            if (timeoutId) clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                setControlsEnabled(true);
            }, 500); 
        };

        window.addEventListener("scroll", disableControls);
        window.addEventListener("touchmove", disableControls);

        return () => {
            window.removeEventListener("scroll", disableControls);
            window.removeEventListener("touchmove", disableControls);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return (
        <OrbitControls 
            autoRotate 
            autoRotateSpeed={modelRotateSpeed} 
            rotateSpeed={modelRotateSpeed}
            enableRotate={controlsEnabled && enableRotate} 
            enableZoom={false} 
        />
    );
}
