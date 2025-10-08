
import React, { useState, useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { certificationsData } from './certificationsData';
import CertificationModal from './CertificationModal';
import styles from './Certifications.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

function Certifications() {
    const [selectedCertification, setSelectedCertification] = useState(null);
    const navigate = useNavigate();

    // Memoizar callbacks para evitar re-renders innecesarios
    const handleViewMore = useCallback((certification) => {
        // Pequeño delay para mejorar la percepción de respuesta
        requestAnimationFrame(() => {
            setSelectedCertification(certification);
        });
    }, []);

    const closeModal = useCallback(() => {
        setSelectedCertification(null);
    }, []);

    const handleViewAllCertifications = useCallback(() => {
        navigate('/certificaciones');
    }, [navigate]);

    // Memoizar configuración de Swiper para evitar recreación
    const swiperConfig = useMemo(() => ({
        modules: [Autoplay, Pagination, EffectCoverflow],
        spaceBetween: 30,
        centeredSlides: true,
        effect: "coverflow",
        loop: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            slideShadows: false,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Pausar al hacer hover
        },
        pagination: { 
            clickable: true,
            dynamicBullets: true, // Bullets dinámicos para mejor UX
        },
        breakpoints: {
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
        // Optimizaciones de performance
        speed: 600, // Velocidad de transición
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
    }), []);

    // Validación de datos
    if (!certificationsData || certificationsData.length === 0) {
        return (
            <section className={styles.certificationsSection}>
                <h2>Certificaciones Destacadas</h2>
                <p className={styles.certDescription}>
                    Próximamente agregaré mis certificaciones.
                </p>
            </section>
        );
    }

    return (
        <section 
            className={styles.certificationsSection} 
            id="certifications"
            aria-label="Sección de certificaciones destacadas"
        >
            <h2>Certificaciones Destacadas</h2>
            <p className={styles.certDescription}>
                Reconocimientos a mi aprendizaje y actualización constante.
            </p>

            <Swiper
                {...swiperConfig}
                className={styles.certificationsSwiper}
                aria-label="Carrusel de certificaciones"
            >
                {certificationsData.map((certification) => (
                    <SwiperSlide 
                        key={certification.id} 
                        className={styles.certSlide}
                        role="group"
                        aria-label={`Certificación: ${certification.title}`}
                    >
                        <article className={styles.certCard}>
                            <img 
                                src={certification.image} 
                                alt={`Certificado de ${certification.title}`}
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    console.error(`Error loading image: ${certification.image}`);
                                }}
                            />
                            <div className={styles.certInfo}>
                                <h3 className={styles.cardtitle}>
                                    {certification.title}
                                </h3>
                                <p className={styles.issuer}>
                                    {certification.issuer}
                                </p>
                                
                                <motion.button
                                    className={styles.viewMoreButton}
                                    onClick={() => handleViewMore(certification)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ 
                                        type: "tween", 
                                        duration: 0.2 
                                    }}
                                    aria-label={`Ver detalles de ${certification.title}`}
                                >
                                    Ver Detalles
                                </motion.button>
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <motion.button
                className={styles.viewAllButton}
                onClick={handleViewAllCertifications}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                    type: "tween",
                    duration: 0.3,
                    ease: "easeOut"
                }}
                aria-label="Ver todas las certificaciones"
            >
                Ver Todas las Certificaciones
            </motion.button>

            {/* Portal del modal para mejor performance */}
            {selectedCertification && (
                <CertificationModal 
                    certification={selectedCertification} 
                    onClose={closeModal}
                />
            )}
        </section>
    );
}

export default Certifications;