
import React, { useState, useEffect } from 'react';
import styles from './CertificationsPage.module.css';
import { CertificationsAllData } from './CertificationsAllData';
import CertificationModal from './CertificationModal';
import { motion } from 'framer-motion';

function CertificationsPage() {
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])



    const handleViewMore = (certification) => {
        setSelectedCertification(certification);
    };

    const closeModal = () => {
        setSelectedCertification(null);
    };

    const filteredCertifications = filter === 'all'
        ? CertificationsAllData
        : CertificationsAllData.filter(cert => cert.category === filter);

    return (
        <div>
            <div className={styles.headerPage}>
                <h1 className={styles.titlePage}>Certificaciones</h1>
                <p className={styles.descriptionPage}>Explora mis certificaciones, cada una un testimonio de mi curiosidad y dedicación.</p>
            </div>

            <div className={styles.containerFilter}>
                <div className={styles.filterButtons}>
                    <button onClick={() => setFilter('all')}>Todas</button>
                    <button onClick={() => setFilter('programacion')}>Programación</button>
                    <button onClick={() => setFilter('ciberseguridad')}>Ciberseguridad</button>
                    
                </div>
            </div>  

            <div className={styles.container}>
                {filteredCertifications.map(certification => (
                    <div key={certification.id} className={styles.certificationCard}>
                        <img src={certification.image} alt={certification.title} className={styles.image} />
                        <h2 className={styles.title}>{certification.title}</h2>
                        <p className={styles.issuer}>{certification.issuer}</p>

                        <div className={styles.buttons}>
                            <motion.button
                                className={styles.viewMoreButton}
                                onClick={() => handleViewMore(certification)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.8 }}
                            >
                                Ver Detalles
                            </motion.button>

                            {certification.verificationLink !== 'undefined' && (
                                <motion.a
                                    href={certification.verificationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                    whileHover={{ scale: 1.1}}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Verificar Certificación
                                </motion.a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {selectedCertification && (
                <CertificationModal certification={selectedCertification} onClose={closeModal} />
            )}
        </div>
    );
}

export default CertificationsPage;