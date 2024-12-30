'use client';

import {Button} from "@/components/ui/button/button";
import {ChevronUp} from "lucide-react";
import {useScrollY} from "@/hooks/useScrollY";
import {motion, useAnimation} from "framer-motion";
import {useEffect} from "react";

export const Up = () => {
    const controls = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        controls.start({opacity: y / document.body.scrollHeight});
    }, [y, controls]);

    const scrollOnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <motion.div
            animate={controls}
            initial={{opacity: 0}}
        >
            <Button size='lg' className='fixed right-12 bottom-12' onClick={scrollOnTop}>
                <ChevronUp size={64}/>
            </Button>
        </motion.div>
    );
};