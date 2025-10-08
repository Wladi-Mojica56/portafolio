import styles from './CertificationModal.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useCallback } from 'react';

// Variantes optimizadas para mejor performance
const backdropVariants = {
    hidden: { 
        opacity: 0,
        transition: {
            duration: 0.2
        }
    },
    visible: { 
        opacity: 1,
        transition: {
            duration: 0.2
        }
    },
    exit: { 
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
};

const modalVariants = {
    hidden: { 
        opacity: 0,
        scale: 0.8,
        y: 50
    },
    visible: { 
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "tween", // Cambiar de spring a tween para mejor performance
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] // Cubic bezier suave
        }
    },
    exit: { 
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: {
            type: "tween",
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

function CertificationModal({ certification, onClose }) {
    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Cerrar con ESC - Memoizado para evitar re-creación
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    // Cerrar al hacer click en el backdrop
    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    if (!certification) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className={styles.modalBackdrop}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={handleBackdropClick}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <motion.div
                    className={styles.modalContent}
                    variants={modalVariants}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Lado izquierdo - Imagen */}
                    <div className={styles.imageSection}>
                        <button 
                            className={styles.closeButton} 
                            onClick={onClose}
                            aria-label="Cerrar modal"
                        >
                            <i className="bi bi-x"></i>
                        </button>
                        <img 
                            src={certification.image} 
                            alt={certification.title}
                            loading="eager" // Cargar inmediatamente
                            decoding="async" // Decodificar de forma asíncrona
                        />
                    </div>
                    
                    {/* Lado derecho - Textos */}
                    <div className={styles.textSection}>
                        <p className={styles.issuer}>{certification.issuer}</p>
                        <h3 id="modal-title">{certification.title}</h3>
                        <p className={styles.description}>{certification.description}</p>
                        {certification.hours && (
                            <p className={styles.hours}>{certification.hours}</p>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default CertificationModal;