import React, { useState, useEffect } from 'react';
import { Box, Select, Option } from '@mui/joy';
import Colors from '../colors';
import DribbbleShot from '@/app/components/dribbleShotCard';
import portfolio from '../../db/dt.json';

type Lang = 'es' | 'en' | 'fr';

const Projects = ({ lang, theme }:{ lang:Lang, theme:string }) => {
    const [width, setWidth] = useState(0);
    const [textOpacity, setTextOpacity] = useState(1);

    // const defaultProjects = [
    //     {
    //         _id: 0,
    //         title: {
    //             es: "Aplicación 'Mi Tiempo con Dios'",
    //             en: "My Time with God App",
    //             fr: "Application Mon Temps avec Dieu"
    //         },
    //         shortDescription: {
    //             es: "Aplicación integral desarrollada en React Native...",
    //             en: "A React Native app providing access to various Bible versions...",
    //             fr: "Une application React Native offrant l'accès à plusieurs versions de la Bible..."
    //         },
    //         description: {
    //             es: "Aplicación integral desarrollada en React Native...",
    //             en: "This project is an all-in-one application developed in React Native...",
    //             fr: "Ce projet est une application tout-en-un développée en React Native..."
    //         },
    //         technologies: ["ReactNative", "TypeScript", "FireBase"],
    //         category: "CrossPlatform",
    //         img: "#",
    //         date: "2024",
    //         repoUrl: "#",
    //         demoUrl: "#"
    //     }
    // ];

    // const [projects, setProjects] = useState(defaultProjects);

    

    // useEffect(() => {
    //     const fetchProjects = async () => {
    //         try {
    //             const response = await fetch("/api/db/dt.json");
    //             const data = await response.json();
    //             if (data && data.Projects) {
    //                 setProjects(data.Projects);
    //             } else {
    //                 setProjects(defaultProjects); // Usa proyectos por defecto si falla la carga
    //             }
    //         } catch (error) {
    //             console.error("Error al obtener proyectos:", error);
    //             setProjects(defaultProjects); // Retorno a proyectos por defecto
    //         }
    //     };

    //     fetchProjects();
    // }, []);

    useEffect(() => {
        const handleSize = () => {
            setWidth(window.innerWidth);
        };

        handleSize();
        window.addEventListener('resize', handleSize);
        return () => {
            window.removeEventListener('resize', handleSize);
        };
    }, []);

    const handleScroll = () => {
        const textHead = document.getElementById('textHead2');
        if (textHead) {
            const y = textHead.getBoundingClientRect().y;
            setTextOpacity(y <= 100 ? 0 : 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const textHead = document.getElementById('textHead2');
        if (textHead) {
            textHead.style.transition = 'all 1s ease';
            textHead.style.opacity = textOpacity.toString();
        }
    }, [textOpacity]);

    return (
        <Box height='auto' width='100%' padding='0vw 3vw'>
            <div className='sticky top-0 left-0' style={{ backgroundColor: theme === 'dark' ? Colors.bgDark : 'white', zIndex: 1 }}>
                <div className='flex flex-col justify-end items-center' style={{ height: 65 }}>
                    <p id='textHead2' className="text-lg" style={{ color: theme === 'dark' ? Colors.textDark : Colors.textLight }}>
                        {lang === 'es' ? 'Participación en' : lang === 'fr' ? 'Participation à des' : 'Participation in'}
                    </p>
                </div>
                <h1 className='text-center text-xl lg:text-2xl pb-3' style={{ color: theme === 'dark' ? Colors.textDark : Colors.textLight, fontWeight: '600', width: '100%', height: 50, padding: '1vw', zIndex: 1 }}>
                    {lang === 'es' ? 'Proyectos' : lang === 'fr' ? 'Projets' : 'Projects'}
                </h1>
                <hr className='m-2' style={{ borderColor: theme === 'dark' ? Colors.textDark : Colors.textLight, filter: 'blur(1px)', opacity: '0.5' }} />
                <div id='btn-group' className='hidden md:block flex flex-row justify-center text-sm' style={{ color: theme === 'dark' ? Colors.textDark : Colors.textLight }}>
                    <button className='p-1 px-3 mx-1 btn btnFilterP active' data-value='1'>All</button>
                    <button className='p-1 px-3 mx-1 btn btnFilterP' data-value='2'>WebDevelopment</button>
                    <button className='p-1 px-3 mx-1 btn btnFilterP' data-value='3'>DataScience</button>
                    <button className='p-1 px-3 mx-1 btn btnFilterP' data-value='4'>CrossPlatform Apps</button>
                </div>
                <div className='inline md:hidden'>
                    <Select size='sm' variant='plain' name='selectFilter' defaultValue={"all"} sx={{ backgroundColor: "transparent", "&:hover": { backgroundColor: "transparent" } }} style={{ width: 100 }}>
                        <Option value={"all"}>All</Option>
                        <Option value={"webDevelopment"}>WebDevelopment</Option>
                        <Option value={"dataScience"}>DataScience</Option>
                        <Option value={"crossPlatform"}>CrossPlatform Apps</Option>
                    </Select>
                </div>
            </div>

            <Box>
                <div id="projectsContainer" className='z-0 flex flex-wrap flex-row justify-center my-3'>
                    {portfolio.Projects.map(project => (
                        <DribbbleShot 
                            key={project._id}
                            description={project.shortDescription[lang]}
                            img={project.img}
                            linkDemo={project.demoUrl}
                            linkProject={project.repoUrl}
                            linkRepo={project.repoUrl}
                            theme={theme}
                            title={project.title[lang]}
                            likes={10}
                            views={15}
                        />
                    ))}
                </div>
            </Box>
        </Box>
    );
}

export default Projects;
