import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import quotes from './quotes';
import {AnimatePresence, motion} from 'framer-motion';

function Footer() {
    const [quote, setQuote] = useState('');

    function getRandomQuote() {
        const index = Math.floor(Math.random() * quotes.length);
        return quotes[index];
    }

    useEffect(() => {
        setQuote(getRandomQuote());
        const interval = setInterval(() => {
            setQuote(getRandomQuote());
        }, 10000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.leftSection}>
                    <AnimatePresence mode="wait">
                        <motion.p 
                            key={quote}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className={styles.quote}
                        >
                            {quote}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className={styles.centerSection}>
                    <div className={styles.socialContainer}>
                        <a 
                            href="https://github.com/Wladi-Mojica56"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.socialIcon}
                            aria-label="GitHub"
                        >
                            <i className="bi bi-github"></i>
                        </a>
                        <a 
                            href="https://linkedin.com/in/yourusername"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.socialIcon}
                            aria-label="LinkedIn"
                        >
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a 
                            href="mailto:wladimyr.mojica@gmail.com"
                            className={styles.socialIcon}
                            aria-label="Email"
                        >
                            <i className="bi bi-envelope-fill"></i>
                        </a>
                    </div>
                </div>

                <div className={styles.rightSection}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} WladCode
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;