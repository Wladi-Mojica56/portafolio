import React from 'react';
import styles from './SobreMi.module.css';
import { textAbout } from './aboutData.js';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 },
    },
};

function SobreMi() {
    return (
        <motion.div
            className={styles.pageContainer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.mainContent}>
                <motion.div className={styles.imageContainer} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <div className={styles.imagePlaceholder}></div>
                </motion.div>

                <motion.div className={styles.textContainer} variants={containerVariants} initial="hidden" animate="visible">
                    <motion.h1 className={styles.title} variants={itemVariants}>
                        Sobre Mí
                    </motion.h1>
                    <motion.p className={styles.paragraph} variants={itemVariants}>
                        {textAbout}
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default SobreMi;