import React, { useState, useEffect } from 'react';
import { Box } from '@mui/joy';
import Image from 'next/image';
import Colors from '../colors';
import SmCard from './smCard';
import portfolio from '../../db/dt.json'



const Academic = ({ lang, theme }: { lang: string; theme: string }) => {

    const [width, setWidth] = useState<number>(0);
    // const [trainingList, setTrainingList] = useState([{
    //     "_id": 1,
    //     "title": "Programación Web",
    //     "institution": "Oracle ONE - Alura Latam",
    //     "date": "2022",
    //     "skills": ["skillId1", "skillId2"],
    //     "img":""
    //   }]);

    // useEffect(()=>{
        // const fetchData = async()=>{
        //     const response = await fetch('/api/db/dt.json')
        //     const data = await response.json()
        //     const tl = data.Academic
        //     setTrainingList(tl)
        // }

        // fetchData()
    // },[])

    useEffect(() => {
        const handleSize = () => {
            setWidth(window.innerWidth);
        };

        handleSize(); // Establece el tamaño inicial

        window.addEventListener('resize', handleSize);
        return () => {
            window.removeEventListener('resize', handleSize);
        };
    }, []);

    return (
        <>
            <Box id="academic" height='auto' width='100%' padding='0vw 3vw' style={{ backgroundColor: theme === 'dark' ? '#101010' : '#efefef' }}>
                <div className='sticky top-0 left-0' style={{ backgroundColor: theme === 'dark' ? '#101010' : '#efefef' }}>
                    <div style={{ height: width > 1000 ? 80 : width > 700 ? 70 : 80 }} />
                    <h1 className='text-center text-xl lg:text-2xl pb-3' style={{ color: theme === 'dark' ? Colors.textDark : Colors.textLight, fontWeight: '600', width: '100%', height: 50, padding: '1vw', zIndex: 0 }}>
                        {lang === 'es' ? 'Estudios y Capacitaciones' : lang === 'fr' ? 'Académique' : 'Academic'}
                    </h1>
                    <hr className='m-2' style={{ borderColor: theme === 'dark' ? Colors.textDark : Colors.textLight, filter: 'blur(1px)', opacity: '0.5' }} />
                </div>

                <Box>
                    <div className='z-0 flex flex-wrap flex-row justify-center my-3'>
                        {portfolio.Academic.map(curso=>(
                            <SmCard key={"a"+curso._id} subtitle={curso.institution} img={curso.img} theme={theme} title={curso.title} />
                        ))}
                    </div>
                </Box>
            </Box>
        </>
    );
}

export default Academic;