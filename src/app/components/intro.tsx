import React, { useState, useEffect } from 'react';
import { Box } from '@mui/joy';
import Image from 'next/image';
import Colors from '../colors';
import binarImg from '@/img/binari.png';
import binarImgLight from '@/img/binariLight.png';
import '../styles/intro.css';

const Intro = ({ lang, theme }: { lang: string; theme: string }) => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        const handleSize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        handleSize(); // Establece el tamaño inicial

        window.addEventListener('resize', handleSize);
        return () => {
            window.removeEventListener('resize', handleSize);
        };
    }, []);

    return (
        <>
            <Image
                className="block md:hidden"
                style={{ position: 'absolute', top: 68, left: 0, width: "100%", zIndex: 0 }}
                width={1000}
                height={556}
                src={theme === 'dark' ? binarImg : binarImgLight}
                alt="Efecto de brillo"
                priority
            />
            <Box height='auto' width='100%' padding='3vw' display='flex' position='relative' zIndex={0}>
                <div id='introContainer' className='flex flex-col-reverse items-end md:flex-row md:items-center justify-end w-full' style={{ zIndex: 1 }}>
                    <div className="max-w-2xl">
                        <div className="text-right">
                            <div className="relative py-1 text-lg leading-6" style={{ color: theme === 'dark' ? Colors.textDark : Colors.textLight }}>
                                {lang === 'en' ? 'Developer & Data Analyst' : (lang === 'es' ? 'Desarrollador & Analista de datos' : (lang === 'fr' ? 'Développeur & Analyste de Données' : 'Developer & Data Analyst'))}
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl" style={{ color: Colors.red, fontWeight: '900' }}>Mario Acendra</h1>
                            <p className="hidden md:flex mt-6 text-lg leading-8" style={{ color: theme === 'dark' ? Colors.textDark : Colors.textLight }}>
                                {lang === 'es' ? 'Desarrollador Web Full Stack y Analista de Datos con experiencia en soluciones digitales de alta calidad, competencias en JavaScript, Java, Python y tecnologías en la nube.' : lang === 'en' ? 'Full Stack Web Developer and Data Analyst with experience in delivering high-quality digital solutions. Proficient in JavaScript, Java, Python, and cloud technologies.' : lang === 'fr' ? 'Développeur Web Full Stack et Analyste de Données avec une expérience dans la fourniture de solutions digitales de haute qualité. Compétent en JavaScript, Java, Python et technologies cloud.' : 'Full Stack Web Developer and Data Analyst with experience in delivering high-quality digital solutions. Proficient in JavaScript, Java, Python, and cloud technologies.'}
                            </p>
                            <div className="mt-10 flex items-end justify-end gap-x-6">
                                <a href="#" className="text-sm font-semibold leading-6" style={{ color: Colors.red, fontWeight: '900' }}>{lang === 'es' ? 'Ver CV' : lang === 'fr' ? 'Voir CV' : 'See Resume'} <span aria-hidden="true">→</span></a>
                            </div>
                        </div>
                    </div>
                    <div className='justify-end'>
                        <Image
                            src={require('/src/img/pict.png')}
                            alt='Foto de Mario'
                            style={{ minWidth: 130, minHeight: 130, maxWidth: 210, maxHeight: 210, borderRadius: "8vw" }}
                            width={0.3 * width}
                            height={0.3 * width}
                        />
                    </div>
                </div>
            </Box>
        </>
    );
}

export default Intro;