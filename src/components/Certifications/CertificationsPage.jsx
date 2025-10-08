
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './CertificationsPage.module.css';
import { CertificationsAllData } from './CertificationsAllData';
import CertificationModal from './CertificationModal';
import { motion, AnimatePresence } from 'framer-motion';

function CertificationsPage() {
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Simular carga inicial
        setTimeout(() => setIsLoading(false), 300);
    }, []);

    // Memoizar el manejo de modal
    const handleViewMore = useCallback((certification) => {
        setSelectedCertification(certification);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedCertification(null);
    }, []);

    // Memoizar cambio de filtro
    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter);
    }, []);

    // Memoizar certificaciones filtradas
    const filteredCertifications = useMemo(() => {
        return filter === 'all'
            ? CertificationsAllData
            : CertificationsAllData.filter(cert => cert.category === filter);
    }, [filter]);

    // Calcular contadores por categoría
    const categoryCounts = useMemo(() => {
        return {
            all: CertificationsAllData.length,
            programacion: CertificationsAllData.filter(cert => cert.category === 'programacion').length,
            ciberseguridad: CertificationsAllData.filter(cert => cert.category === 'ciberseguridad').length,
        };
    }, []);

    // Variantes de animación
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const filterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, delay: 0.2 }
        }
    };

    const pageTransition = {
        hidden: { opacity: 0, y: -40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <motion.div
                    className={styles.loader}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                    <i className="bi bi-arrow-clockwise"></i>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div 
            className={styles.pageWrapper}
            variants={pageTransition}
            initial="hidden"
            animate="visible"
        >
            {/* Header con animación */}
            <motion.div 
                className={styles.headerPage}
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                    className={styles.titlePage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Certificaciones
                </motion.h1>
                <motion.p 
                    className={styles.descriptionPage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Explora mis certificaciones, cada una un testimonio de mi curiosidad y dedicación.
                </motion.p>
            </motion.div>

            {/* Filtros sin iconos */}
            <motion.div 
                className={styles.containerFilter}
                variants={filterVariants}
                initial="hidden"
                animate="visible"
            >
                <div className={styles.filterButtons} role="tablist" aria-label="Filtros de certificaciones">
                    <motion.button
                        className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                        onClick={() => handleFilterChange('all')}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        role="tab"
                        aria-selected={filter === 'all'}
                        aria-label="Mostrar todas las certificaciones"
                    >
                        <span>Todas</span>
                    </motion.button>

                    <motion.button
                        className={`${styles.filterButton} ${filter === 'programacion' ? styles.active : ''}`}
                        onClick={() => handleFilterChange('programacion')}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        role="tab"
                        aria-selected={filter === 'programacion'}
                        aria-label="Mostrar certificaciones de programación"
                    >
                        <span>Programación</span>
                    </motion.button>

                    <motion.button
                        className={`${styles.filterButton} ${filter === 'ciberseguridad' ? styles.active : ''}`}
                        onClick={() => handleFilterChange('ciberseguridad')}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        role="tab"
                        aria-selected={filter === 'ciberseguridad'}
                        aria-label="Mostrar certificaciones de ciberseguridad"
                    >
                        <span>Ciberseguridad</span>
                        
                    </motion.button>
                </div>
            </motion.div>

            {/* Grid de certificaciones con animaciones */}
            <AnimatePresence mode="wait">
                <motion.div 
                    className={styles.container}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={filter}
                >
                    {filteredCertifications.length > 0 ? (
                        filteredCertifications.map((certification, index) => (
                            <motion.div
                                key={certification.id}
                                className={styles.certificationCard}
                                variants={cardVariants}
                                custom={index}
                                whileHover={{ 
                                    y: -10,
                                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                                    transition: { duration: 0.3 }
                                }}
                                layout
                            >
                                <div className={styles.imageWrapper}>
                                    <img 
                                        src={certification.image} 
                                        alt={`Certificación de ${certification.title}`} 
                                        className={styles.image}
                                        loading="lazy"
                                    />
                                </div>

                                <div className={styles.cardContent}>
                                    <h2 className={styles.title}>{certification.title}</h2>
                                    <p className={styles.issuer}>
                                        {certification.issuer}
                                    </p>

                                    <div className={`${styles.buttons} ${(!certification.verificationLink || certification.verificationLink === 'undefined') ? styles.singleButton : ''}`}>
                                        <motion.button
                                            className={styles.viewMoreButton}
                                            onClick={() => handleViewMore(certification)}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={`Ver detalles de ${certification.title}`}
                                        >
                                            <i className="bi bi-info-circle"></i>
                                            <span>Ver Detalles</span>
                                        </motion.button>

                                        {certification.verificationLink && certification.verificationLink !== 'undefined' && (
                                            <motion.a
                                                href={certification.verificationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.link}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                aria-label={`Verificar certificación de ${certification.title}`}
                                            >
                                                <i className="bi bi-patch-check"></i>
                                                <span>Verificar</span>
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div 
                            className={styles.emptyState}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <i className="bi bi-inbox"></i>
                            <h3>No hay certificaciones en esta categoría</h3>
                            <p>Intenta con otro filtro</p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Modal con AnimatePresence */}
            <AnimatePresence>
                {selectedCertification && (
                    <CertificationModal 
                        certification={selectedCertification} 
                        onClose={closeModal} 
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default CertificationsPage;
