import React from 'react';
import styles from './Proyectos.module.css';
import { motion } from 'framer-motion';
import projectsData from './projectsData';

function Proyectos() {
    return (
        <section className={styles.container} id="proyectos">
            <div className={styles.header}>
                <h1 className={styles.title}>Mis Proyectos</h1>
                <p className={styles.subtitle}>Cada Proyecto es una Oportunidad de Superar los Limites</p>
            </div>
            
            <div className={styles.projectsList}>
                {projectsData.map((project, index) => (
                    <motion.div 
                        key={project.id} 
                        className={`${styles.projectPanel} ${index % 2 === 1 ? styles.reverse : ''}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        <div className={styles.imageSection}>
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className={styles.projectImage}
                            />
                        </div>
                        
                        <div className={styles.contentSection}>
                            <div className={styles.projectInfo}>
                                <span className={styles.status}>{project.status}</span>
                                <h2 className={styles.projectTitle}>{project.title}</h2>
                                <p className={styles.projectDescription}>{project.description}</p>
                                
                                <div className={styles.techStack}>
                                    <h4 className={styles.techTitle}>Tecnologías:</h4>
                                    <div className={styles.techTags}>
                                        {project.technologies.map((tech, idx) => (
                                            <span key={idx} className={styles.techTag}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                {project.status !== 'En desarrollo' && (
                                    <div className={styles.projectLinks}>
                                        <motion.a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.primaryButton}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Ver Proyecto
                                        </motion.a>
                                        <motion.a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.secondaryButton}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Código
                                        </motion.a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default Proyectos;