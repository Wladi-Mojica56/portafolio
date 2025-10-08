import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Proyectos.module.css';
import projectsData from './projectsData';

function Proyectos() {
    const [isMobile, setIsMobile] = useState(false);

    // Scroll al inicio al montar el componente
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Detectar si es móvil
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    // Obtener todas las tecnologías únicas
    const allTechnologies = useMemo(() => {
        const techSet = new Set();
        projectsData.forEach(project => {
            project.technologies.forEach(tech => techSet.add(tech));
        });
        return Array.from(techSet);
    }, []);

    // Estadísticas de proyectos
    const stats = useMemo(() => ({
        total: projectsData.length,
        completed: projectsData.filter(p => p.status === 'Completado').length,
        inProgress: projectsData.filter(p => p.status === 'En desarrollo').length,
        technologies: allTechnologies.length
    }), [allTechnologies]);

    // Animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className={styles.container} id="proyectos">
            {/* Header */}
            <motion.div 
                className={styles.header}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className={styles.title}>Mis Proyectos</h1>
                <p className={styles.subtitle}>
                    Cada Proyecto es una Oportunidad de Superar los Límites
                </p>
            </motion.div>

            {/* Estadísticas - Solo en desktop */}
            {!isMobile && (
                <motion.div 
                    className={styles.statsContainer}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>{stats.total}</span>
                        <span className={styles.statLabel}>Proyectos</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>{stats.completed}</span>
                        <span className={styles.statLabel}>Completados</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>{stats.inProgress}</span>
                        <span className={styles.statLabel}>En Desarrollo</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>{stats.technologies}</span>
                        <span className={styles.statLabel}>Tecnologías</span>
                    </div>
                </motion.div>
            )}

            {/* Lista de Proyectos */}
            <motion.div 
                className={styles.projectsList}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {projectsData.map((project, index) => (
                    <motion.div 
                        key={project.id} 
                        className={`${styles.projectPanel} ${index % 2 === 1 ? styles.reverse : ''}`}
                        variants={itemVariants}
                        layout
                    >
                        {/* Sección de Imagen */}
                        <div className={styles.imageSection}>
                            <div className={styles.imageContainer}>
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className={styles.projectImage}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        
                        {/* Sección de Contenido */}
                        <div className={styles.contentSection}>
                            <div className={styles.projectInfo}>
                                <motion.span 
                                    className={styles.status}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <i className={`bi ${project.status === 'Completado' ? 'bi-check-circle-fill' : 'bi-hourglass-split'}`}></i>
                                    {project.status}
                                </motion.span>
                                
                                <h2 className={styles.projectTitle}>{project.title}</h2>
                                <p className={styles.projectDescription}>{project.description}</p>
                                
                                {/* Stack Tecnológico */}
                                <div className={styles.techStack}>
                                    <div className={styles.techTags}>
                                        {project.technologies.map((tech, idx) => (
                                            <motion.span 
                                                key={idx} 
                                                className={styles.techTag}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Enlaces del Proyecto */}
                                {project.status !== 'En desarrollo' && (
                                    <motion.div 
                                        className={styles.projectLinks}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <motion.a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.primaryButton}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <i className="bi bi-box-arrow-up-right"></i>
                                            Ver Proyecto
                                        </motion.a>
                                        <motion.a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.secondaryButton}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <i className="bi bi-github"></i>
                                            Código
                                        </motion.a>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

export default Proyectos;