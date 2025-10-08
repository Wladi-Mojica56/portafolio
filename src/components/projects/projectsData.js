import interview from '../../../src/Imgs/portada1.png';
import wladcore from '../../../src/Imgs/portada2.png';
import whitehunters from '../../../src/Imgs/portada3 (2).png';

const projectsData = [
    {
        id: 1,
        title: 'Interview AI',
        description: 'Practica Entrevistas Tecnicas y Psicologicas con AI',
        image: interview,
        liveUrl: 'https://formlogin-bcd6d.firebaseapp.com/',
        githubUrl: 'https://github.com/Wladi-Mojica56',
        technologies: ['React', 'CSS', 'Node.js', 'Firebase', 'Gemini AI'],
        status: 'Completado'
    },
    {
        id: 2,
        title: 'Startup WladCore',
        description: 'Plataforma Web Enfocada en el Desarollo Web',
        image: wladcore,
        liveUrl: 'https://example.com/project-two',
        githubUrl: 'https://github.com/usuario/project-two',
        technologies: ['Javascript', 'CSS', 'Node.js', 'Firebase', 'Gemini AI'],
        status: 'En desarrollo'
    },
    {
        id: 3,
        title: 'Startup WhiteHunters',
        description: 'Plataforma Web Enfocada en Pentesting',
        image: whitehunters,
        liveUrl: 'https://example.com/project-two',
        githubUrl: 'https://github.com/usuario/project-two',
        technologies: ['Javascript', 'CSS', 'Node.js', 'Firebase', 'Gemini AI'],
        status: 'En desarrollo'
    },
];

export default projectsData;