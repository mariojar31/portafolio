import { useEffect, useState } from 'react';
import Colors from '../colors';

const SmCard = ({ title, subtitle, img, theme }: { title: string; subtitle: string; img: string; theme: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleSize = () => {
      setWidth(window.innerWidth);
    };

    // Solo ejecuta el efecto si estamos en el cliente
    if (typeof window !== 'undefined') {
      handleSize(); // Establece el ancho inicial
      window.addEventListener('resize', handleSize); // Agregar el evento de resize
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleSize); // Limpiar el evento
      }
    };
  }, []);

  const cardStyle = {
    width: '20vw',
    minWidth: 150,
    height: '12.361vw',
    minHeight: 92.705,
    backgroundColor: 'transparent',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    margin: '10px',
  };

  const h = {
    fontSize: width < 600 ? '0.9rem' : '1.1rem',
    fontWeight: 600,
  };

  return (
    <div className='flex flex-col'>
      <div style={cardStyle}>
        <figure>
          <img
            src={img}
            alt="Image Project"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '8px',
            }}
          />
        </figure>
      </div>
      <div className='text-center' style={{ color: theme === 'dark' ? Colors.textDark : Colors.textLight, width: '20vw', minWidth: 150 }}>
        <h4 style={h}>{title}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default SmCard;
