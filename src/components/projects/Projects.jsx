import styles from './Projects.module.css';
import projectsData from './projectsData';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import React, { useMemo, useCallback } from 'react';

function Projects() {
    const navigate = useNavigate();

    // Memoizar proyectos destacados (primeros 3)
    const featuredProjects = useMemo(() => {
        return projectsData.slice(0, 3);
    }, []);

    // Memoizar handler de navegación
    const handleViewAllProjects = useCallback(() => {
        navigate('/proyectos');
    }, [navigate]);

    // Memoizar handler de navegación a proyecto individual
    const handleProjectClick = useCallback((url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }, []);

    // Variantes de animación para las cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: index * 0.15,
                duration: 0.5,
                type: "spring",
                stiffness: 100
            }
        }),
        hover: {
            y: -10,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3 }
        }
    };

    // Variantes para la imagen
    const imageVariants = {
        hover: {
            scale: 1.1,
            transition: { duration: 0.4 }
        }
    };

    // Variantes para el título de sección
    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className={styles.projectsSection} id="projects">
            <motion.h2 
                className={styles.sectionTitle}
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                Proyectos Destacados
            </motion.h2>
            
            <motion.p 
                className={styles.sectionDescription}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Aquí encontrarás algunos de mis proyectos más destacados.
            </motion.p>

            <div className={styles.projectsGrid}>
                {featuredProjects.map((project, index) => (
                    <motion.div 
                        key={project.id} 
                        className={styles.projectCard}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className={styles.imageContainer}>
                            <motion.img 
                                src={project.image} 
                                alt={`Captura de pantalla del proyecto ${project.title}`}
                                loading="lazy"
                                variants={imageVariants}
                            />
                            <div className={styles.imageOverlay}>
                                <i className="bi bi-eye" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div className={styles.projectLinks}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>

                            <div className={styles.techTags} role="list" aria-label="Tecnologías utilizadas">
                                {project.technologies.map((tech, idx) => (
                                    <motion.span 
                                        key={`${project.id}-tech-${idx}`}
                                        className={styles.techTag}
                                        role="listitem"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>

                            {project.status === 'En desarrollo' ? (
                                <div className={styles.developmentStatus}>
                                    <motion.div
                                        className={styles.developmentBadge}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        role="status"
                                        aria-label="Proyecto en desarrollo"
                                    >
                                        <i className="bi bi-hourglass-split" aria-hidden="true"></i>
                                        <span>En Desarrollo</span>
                                    </motion.div>
                                </div>
                            ) : (
                                <div className={styles.buttons}>
                                    <motion.a
                                        href={project.liveUrl}
                                        className={styles.button}
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Ver proyecto ${project.title} en vivo`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleProjectClick(project.liveUrl);
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                        <span>Ver Proyecto</span>
                                    </motion.a>
                                    <motion.a
                                        href={project.githubUrl}
                                        className={styles.button}
                                        whileHover={{ scale: 1.08, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Ver código fuente de ${project.title} en GitHub`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleProjectClick(project.githubUrl);
                                        }}
                                    >
                                        <i className="bi bi-github" aria-hidden="true"></i>
                                        <span>Ver Código</span>
                                    </motion.a>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className={styles.buttonContainer}>
                <motion.button
                    className={styles.viewAllButton}
                    onClick={handleViewAllProjects}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    aria-label="Ver todos los proyectos"
                >
                    <span>Ver Todos los Proyectos</span>
                    <motion.i 
                        className="bi bi-arrow-right" 
                        aria-hidden="true"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.button>
            </div>
        </section>
    );
}

export default Projects;