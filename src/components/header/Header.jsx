import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Navigation from '../header/navigation';
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';
import logoDesktop from '../../../src/Imgs/WladCode.png';
import logoMobile from '../../../src/Imgs/WCODE.png';


function Header() {
    const [logoSrc, setLogoSrc] = useState(logoDesktop); // Cambiado de logoText a logoSrc
    const menuItems = ['Inicio', 'Sobre Mi', 'Certificaciones', 'Proyectos'];
    const menuItemsMobile = ['Inicio', 'Sobre Mi', 'Certificaciones', 'Proyectos', 'Contacto'];

    
    ///Estudiar useEffect 


    useEffect(() => {
        // Función para actualizar el logoSrc basado en el ancho de la pantalla
        const updateLogoSrc = () => {
            if (window.innerWidth <= 480) {
                setLogoSrc(logoMobile); // Usar la imagen importada para móvil
            } else {
                setLogoSrc(logoDesktop); // Usar la imagen importada para desktop
            }
        };
        
        // Ejecutar la función inicialmente
        updateLogoSrc();
        
        // Añadir un event listener para el evento resize
        window.addEventListener('resize', updateLogoSrc);
        
        // Limpiar el event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', updateLogoSrc);
        };
    }, []); // Array vacío significa que este efecto solo se ejecuta una vez al montar el componente
    

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link to="/" className={styles.logoLink}>
                    <img 
                        src={logoSrc} 
                        alt="WladCode Logo" 
                        className={`${styles.logo} ${styles['tracking-in-expand']}`}
                    />
                </Link>
            </div>

            <div className={styles.navigationContainer}>
                <Navigation menuItems={menuItems} menuItemsMobile={menuItemsMobile} />
            </div>

            <div className={styles.contactContainer}>

                <motion.button
                href="#contact" 
                className={styles.contact}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3}}
                whileTap={{ scale: 0.9 }}
                >
                    <span className={styles.contactText}>Contacto</span>
                </motion.button>

            </div>
            
        </header>
    );
}

export default Header;