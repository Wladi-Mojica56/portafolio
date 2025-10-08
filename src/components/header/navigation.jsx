import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation({ menuItems, menuItemsMobile }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const itemsToDisplay = isMenuOpen ? menuItemsMobile : menuItems;

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

                {itemsToDisplay.map((item, index) => (
                    <li key={index}>
                        {item === 'Contacto' ? (
                            <button
                                onClick={() => {
                                    window.open('https://wa.me/573001234567?text=Hola!%20Vi%20tu%20portafolio%20y%20me%20interesa%20contactarte', '_blank');
                                    setIsMenuOpen(false);
                                }}
                                className={styles.navLink}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {item}
                            </button>
                        ) : (
                            <Link 
                                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                                className={styles.navLink}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        )}
                    </li>
                ))}

                {/*Contenedor de iconos sociales*/}
                <div className={styles.socialContainer}>
                    <a 
                        href="https://github.com/yourusername" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label="GitHub"
                    >
                        <i className="bi bi-github"></i>
                    </a>
                    <a 
                        href="https://wa.me/573001234567?text=Hola!%20Vi%20tu%20portafolio%20y%20me%20interesa%20contactarte" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label="Whatsapp"
                    >
                        <i className="bi bi-whatsapp"></i>
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