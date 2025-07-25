import React, { useState } from 'react';
import styles from './Navigation.module.css';

function Navigation({ menuItems, menuItemsMobile }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };




//¿Puedes explicarme cómo funciona el mapeo de itemsToDisplay en la función Navigation del archivo navigation.jsx ubicado en src/components/header/?  Las partes marcadas con "Notable Addition" en los comentarios





    // NOTABLE ADDITION START
    // This line determines which menu items to display based on whether the menu is open or closed
    const itemsToDisplay = isMenuOpen ? menuItemsMobile : menuItems;
    // NOTABLE ADDITION END

    return (
        <nav className={styles.nav}>
            <button 
                className={styles.menuToggle} 
                onClick={toggleMenu}
                aria-label="Menu de Navegacion"
                aria-expanded={isMenuOpen}
            >
                <i className="bi bi-list"></i>   
            </button>

            <ul className={`${styles.navList} ${isMenuOpen ? styles.menuOpen : ''}`}>

                <button
                    className={styles.closeButton} 
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Cerrar Menu"
                >
                    <i className="bi bi-x"></i>
                </button>

                {/* NOTABLE ADDITION START */}
                {/* This map function now uses itemsToDisplay instead of menuItems */}
                {itemsToDisplay.map((item, index) => (
                    <li key={index}>
                        <a 
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                            className={styles.navLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </a>
                    </li>
                ))}
                {/* NOTABLE ADDITION END */}

                {/*Contenedor de iconos sociales*/}

                <div className={styles.socialContainer}>
                    <a 
                        href="https://github.com/yourusername" //cambiar usuario github
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label="GitHub"
                    >
                        <i className="bi bi-github"></i>
                    </a>
                    <a 
                        href="https://linkedin.com/in/yourusername"  //cambiar usuario linkedin
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label="LinkedIn"
                    >
                        <i className="bi bi-linkedin"></i>
                    </a>
                    <a 
                        href="mailto:your.email@example.com" //cambiar usuario gmail
                        className={styles.socialIcon}
                        aria-label="Email"
                    >
                        <i className="bi bi-envelope-fill"></i>
                    </a>
                </div>

            </ul>
        </nav>
    );
}

export default Navigation;