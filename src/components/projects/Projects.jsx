import { span } from 'motion/react-client';
import styles from './Projects.module.css'
import projectsData from './projectsData';
import {motion} from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Projects(){
    const navigate = useNavigate();

    const handleViewAllProjects = () => {
        navigate('/proyectos');
    };

    return(
        <section className={styles.projectsSection} id="projects">
            <h2 className={styles.sectionTitle}>Proyectos Destacados</h2>
            <p className={styles.sectionDescription}>Aquí encontrarás algunos de mis proyectos más destacados.</p>
            <div className={styles.projectsGrid}>
                {projectsData.map(project => (
                <div key={project.id} className={styles.projectCard}>
                    <img src={project.image} alt={project.title} />
                        <div className={styles.projectLinks}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>

                            <div className={styles.techTags}>
                                {project.technologies.map((tech, idx) => (
                                    <span key={idx} className={styles.techTag}>{tech}</span>
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
                                    >
                                        En Desarrollo
                                    </motion.div>
                                </div>
                            ) : (
                                <div className={styles.buttons}>
                                    <motion.a
                                        href={project.liveUrl}
                                        className={styles.button}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.8 }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Visualizar Proyecto
                                    </motion.a>
                                    <motion.a
                                        href={project.githubUrl}
                                        className={styles.button}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.8 }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Repositorio Github
                                    </motion.a>
                                </div>
                            )}
                        </div>
                </div>
                ))}
            </div>
            <motion.button
                className={styles.viewAllButton}
                onClick={handleViewAllProjects}
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 0 }}
                whileHover={{ rotate: 2, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
            >
            Ver Todos los Proyectos
            </motion.button>
        </section>
    )
}

export default Projects;