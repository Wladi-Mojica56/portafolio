import { motion } from 'framer-motion';
import React, { useCallback, useMemo } from 'react';
import Typewriter from './Typewriter';
import styles from './Hero.module.css';

const phrases = [
    "React • TypeScript • Firebase",
    "Frontend Development",
    "UI/UX Implementation"
];

// Constantes movidas fuera del componente para evitar recreación
const TECHNOLOGIES = [
    { name: 'React', icon: 'bi bi-react', color: '#61DAFB' },
    { name: 'TypeScript', icon: 'bi bi-filetype-tsx', color: '#3178C6' },
    { name: 'JavaScript', icon: 'bi bi-filetype-js', color: '#F7DF1E' },
    { name: 'Firebase', icon: 'bi bi-fire', color: '#FFCA28' },
    { name: 'Git', icon: 'bi bi-git', color: '#F05032' }
];

const SOCIAL_LINKS = [
    { name: 'GitHub', icon: 'bi bi-github', url: 'https://github.com/wladi-mojica56' },
    { name: 'Whatsapp', icon: 'bi bi-whatsapp', url: 'https://linkedin.com/in/...' },
    { name: 'Email', icon: 'bi bi-envelope', url: 'mailto:tu@email.com' }
];

// Variantes de animación memoizadas
const titleVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 }
};

const roleVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 }
};

const techContainerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

const buttonVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 }
};

const socialContainerVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
};

const typewriterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

function Hero() {
    const name = "Wladimyr Mojica";
    const role = "Desarrollador Frontend";

    // Memoizar el handler para evitar recreación en cada render
    const handleDownloadCV = useCallback(async () => {
        const cvUrl = '/portafolio/files/CV-Wladimyr-Mojica-Romero.pdf';
        
        try {
            const response = await fetch(cvUrl, { method: 'HEAD' });
            
            if (!response.ok) {
                throw new Error('Archivo no encontrado');
            }

            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = 'CV_Wladimyr_Mojica_Romero.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error al descargar CV:', error);
            alert('Error al descargar el CV. Por favor, inténtalo de nuevo.');
        }
    }, []);

    // Memoizar las configuraciones de hover para evitar recreación
    const buttonHoverConfig = useMemo(() => ({
        scale: 1.05,
        boxShadow: "0 8px 30px rgba(124, 58, 237, 0.4)"
    }), []);

    const iconHoverConfig = useMemo(() => ({
        rotate: 5,
        scale: 1.1
    }), []);

    const socialHoverConfig = useMemo(() => ({
        scale: 1.2,
        rotate: 5
    }), []);

    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                {/* Título Principal */}
                <motion.h1
                    className={styles.heroTitle}
                    variants={titleVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    Hola! <br/> Soy <span className={styles.name}>{name}</span>
                </motion.h1>

                {/* Rol */}
                <motion.h2
                    className={styles.role}
                    variants={roleVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    {role}
                </motion.h2>

                {/* Tecnologías */}
                <motion.div 
                    className={styles.technologiesContainer}
                    variants={techContainerVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div className={styles.technologiesGrid}>
                        {TECHNOLOGIES.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                className={styles.techBadge}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: 1 + (index * 0.1)
                                }}
                                whileHover={{ 
                                    scale: 1.1,
                                    boxShadow: `0 0 20px ${tech.color}40`
                                }}
                            >
                                <i 
                                    className={`${tech.icon} ${styles.techIcon}`}
                                    style={{ color: tech.color }}
                                />
                                <span className={styles.techName}>{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Botones de Acción */}
                <div className={styles.buttonContainer}>
                    <motion.button 
                        className={styles.downloadButton} 
                        aria-label="Descargar CV de Wladimyr Mojica"
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
                        whileTap={{ scale: 0.95 }}
                        whileHover={buttonHoverConfig}
                        onClick={handleDownloadCV}
                    >
                        <motion.i 
                            className={`bi bi-download ${styles.downloadIcon}`}
                            whileHover={iconHoverConfig}
                            transition={{ duration: 0.2 }}
                        />
                        <span className={styles.buttonText}>Descargar CV</span>
                    </motion.button>

                    {/* Redes Sociales */}
                    <motion.div 
                        className={styles.socialLinks}
                        variants={socialContainerVariants}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.6, delay: 1.7 }}
                    >
                        {SOCIAL_LINKS.map((social, index) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label={social.name}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ 
                                    duration: 0.4, 
                                    delay: 1.8 + (index * 0.1) 
                                }}
                                whileHover={socialHoverConfig}
                                whileTap={{ scale: 0.9 }}
                            >
                                <i className={`${social.icon} ${styles.socialIcon}`}></i>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Typewriter - Ahora debajo de las redes sociales */}
                <motion.div
                    variants={typewriterVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className={styles.typewriterWrapper}
                >
                    <Typewriter texts={phrases}/>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;