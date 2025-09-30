import styles from './hero.module.css';
import { motion } from 'framer-motion';
import {useState, useEffect} from 'react';
import {phrases} from './phrases';
import Typewriter from './typewriter';

function Hero() {
    const name = "Wladimyr Mojica";
    const role = "Desarrollador Frontend"; // Corregí la ortografía
    const [currentPhrase, setCurrentPhrase] = useState('');
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPhrase((prev) => prev + phrases[index][charIndex]);
            setCharIndex((prev) => prev + 1);
        },100);

        if(charIndex === phrases[index].length){
            clearTimeout(timeout);
            setTimeout(() => {
                setCharIndex(0);
                setIndex((prev) => (prev + 1) % phrases.length);
                setCurrentPhrase('');
            },2000)
        }
        return () => clearTimeout(timeout);
    },[charIndex, index]);

    const handleDownloadCV = async () => {
        const cvUrl = '/portafolio/files/CV-Wladimyr-Mojica-Romero.pdf';
        
        try {
            // Verificar si el archivo existe
            const response = await fetch(cvUrl, { method: 'HEAD' });
            
            if (response.ok) {
                const link = document.createElement('a');
                link.href = cvUrl;
                link.download = 'CV_Wladimyr_Mojica_Romero.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                throw new Error('Archivo no encontrado');
            }
        } catch (error) {
            console.error('Error al descargar CV:', error);
            alert('Error al descargar el CV. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <motion.h1
                    initial={{opacity:0, y: 30}}
                    animate={{opacity:1, y: 0}}
                    transition={{duration: 1, ease: "easeOut"}}
                >
                    Hola! <br/> Soy <span className={styles.name}>{name}</span>
                </motion.h1>

                <motion.h2
                    className={styles.role}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    {role}
                </motion.h2>

                <Typewriter texts={phrases}/>

                <div className={styles.buttonContainer}>
                    <motion.button 
                        className={styles.downloadButton} 
                        aria-label="Descargar CV de Wladimyr Mojica"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5}}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={handleDownloadCV}
                    >
                        <i className="bi bi-download"></i> Descargar CV
                    </motion.button>
                </div>
            </div>
        </section>
    );
}

export default Hero;