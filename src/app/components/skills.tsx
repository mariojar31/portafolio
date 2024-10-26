import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/joy';
import Colors from '../colors';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import portfolio from '../../db/dt.json';

const colorsDark = ["#e5e7eb", "#e5e7eb", "#e5e7eb", "#e5e7eb", "#8b8b8b", "#8b8b8b", "#3a3a3a", "brown"];
const colorsLight = ["#3b3b3b", "#3b3b3b", "#3b3b3b", "#8b8b8b", "#8b8b8b", "#3a3a3a", "brown"];

const preloadSkills = [
  { text: 'JavaScript', size: 65 },
  { text: 'HTML', size: 60 },
  { text: 'CSS', size: 50 },
  { text: 'React', size: 60 },
  { text: 'Node.js', size: 40 },
  { text: 'Java', size: 70 },
  { text: 'Angular', size: 40 },
  { text: 'Flask', size: 50 },
  { text: 'Python', size: 55 },
  { text: 'Tailwind', size: 35 },
  { text: 'TypeScript', size: 50 },
  { text: 'SpringBoot', size: 45 },
];

interface Word {
  text: string;
  size: number;
  x?: number; // Coordenada x
  y?: number; // Coordenada y
  rotate?: number; // Rotación
}

const WordCloudComponent = ({ theme }: { theme: string }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState(0);
  // const [words, setWords]=useState(preloadSkills)

  // useEffect(()=>{
  //   const fethWords = async()=>{
  //     const response = await fetch('/api/db/dt.json')
  //     const data = await response.json()
  //     if(data){
  //       const words = data.Skills
  //       setWords(words)
  //     }
      
  //   }

  //   fethWords()
  // },[])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth); 
    };


    if (typeof window !== 'undefined') {
      handleResize(); 
      window.addEventListener('resize', handleResize); 
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize); 
      }
    };
  }, []);

  useEffect(() => {
    if (width > 0) {
      const layout = cloud()
        .size([width, 500])
        .words(portfolio.Skills.map(word => ({ text: word.text, size: word.size })))
        .padding(15)
        .rotate(0)
        .fontSize(d => d.size || 0)
        .on('end', draw);

      layout.start();
    }
  }, [width, theme]);

  const draw = (words: Word[]) => {
    d3.select(svgRef.current)
      .selectAll('*')
      .remove(); // Limpiar el SVG antes de dibujar

    const g = d3.select(svgRef.current)
      .append('g')
      .attr('transform', `translate(${width / 2},250)`);

    words.forEach(word => {
      g.append('text')
        .style('font-size', word.size + 'px')
        .style('fill', () => theme === 'dark' ? (colorsDark[Math.floor(Math.random() * colorsDark.length)]) : (colorsLight[Math.floor(Math.random() * colorsLight.length)]))
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${word.x}, ${word.y}) rotate(${word.rotate})`)
        .text(word.text)
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('font-size', (word.size * 1.5) + 'px') // Aumentar el tamaño
            .style('filter', 'blur(1px)'); // Aplicar desenfoque
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('font-size', word.size + 'px') // Restaurar tamaño
            .style('filter', 'none'); // Quitar desenfoque
        });
    });
  };

  return (
    <div>
      <svg ref={svgRef} width="100%" height="500" />
    </div>
  );
};

const Skills = ({ lang, theme }: { lang: string; theme: string }) => {
  const [texthOpacity, setTexthOpacity] = useState(1);

  const handleScroll = () => {
    setTexthOpacity(window.scrollY > 280 ? 0 : 1);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const textHead = document.getElementById('textHead');
    if (textHead) {
      textHead.style.transition = 'all 1s ease';
      textHead.style.opacity = `${texthOpacity}`;
    }
  }, [texthOpacity]);

  return (
    <>
      <Box height='auto' width='100%' padding='0vw 3vw' style={{ backgroundColor: theme === 'dark' ? '#101010' : '#efefef' }}>
        <div className='sticky top-0 left-0' style={{ backgroundColor: theme === 'dark' ? '#101010' : '#efefef' }}>
          <div className='flex flex-col justify-end items-center' style={{ height: 80 }}>
            <p id='textHead' className="text-lg" style={{ color: theme === 'dark' ? Colors.textDark : Colors.textLight }}>
              {lang === 'es' ? 'Con habilidades en las' : lang === 'fr' ? 'Avec des compétences dans les' : 'With skills in'}
            </p>
          </div>
          <h1 className='text-center text-xl lg:text-2xl pb-3' style={{ color: theme === 'dark' ? Colors.textDark : Colors.textLight, fontWeight: '600', width: '100%', height: 50, padding: '1vw', zIndex: 0 }}>
            {lang === 'es' ? 'Tecnologías' : lang === 'fr' ? 'Technologies' : 'Technologies'}
          </h1>
          <hr className='m-2' style={{ borderColor: theme === 'dark' ? Colors.textDark : Colors.textLight, filter: 'blur(1px)', opacity: '0.5' }} />
        </div>

        <div>
          <br />
          <WordCloudComponent theme={theme} />
        </div>
      </Box>
    </>
  );
};

export default Skills;
