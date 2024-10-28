import { GitHub, LinkRounded, Favorite, Visibility } from '@mui/icons-material';
import React from 'react';
import Colors from '../colors';

const DribbbleShot = ({ title, description, img, linkRepo, linkDemo, linkProject, views, likes, theme }:{ title:string, description:string, img:string, linkRepo:string, linkDemo:string, linkProject:string, views:number, likes:number, theme: string }) => {

  const imgStyle = {
    width: '100%',
    display: 'block',
    borderRadius:'8px',
    height:'26.575vw',
    minHeight: 185.41
    
  };


  const buttonStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: 'none',
    borderRadius: '4px',
    padding: '8px',
    marginLeft: '2px',
    cursor: 'pointer',
  };

  return (
    <div style={{width: '43vw',
      minWidth: 300,
      backgroundColor: 'transparent',
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      margin: '10px',}}>
      <figure>
        <img src={img} alt="Image Project" style={imgStyle} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme=='dark'?'linear-gradient(180deg, rgba(0,0,0,0.10) 5%, rgba(0,0,0,0.20) 10%, rgba(0,0,0,0.60) 20%, rgba(0,0,0,0.95) 98%, rgba(0,0,0,0.98) 99.99%':'linear-gradient(180deg, rgba(255,255,255,0.10) 5%, rgba(255,255,255,0.20) 10%, rgba(255,255,255,0.60) 20%, rgba(255,255,255,0.95) 98%, rgba(255,255,255,0.98) 99.99%',
            opacity: 0,
            transition: 'opacity 0.4s ease-in',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '16px',
            color: '#fff',
          }}

          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
        >
        <div className="flex flex-row justify-between items-center">
          <h2>
              <a target='_blank' href={linkProject} style={{textDecoration: 'none'}}>
                <p style={{ color: 'brown', fontWeight: '700', textShadow: theme=='dark'?'1px 1px rgba(0,0,0,0.7)':'1px 1px rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>
                  {title}
                </p>
              </a>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a target='_blank' href={linkRepo} style={buttonStyle}>
                <span style={{color:theme=="dark"?Colors.textDark:Colors.textLight}}><GitHub/></span>
              </a>
              <a target='_blank' href={linkDemo} style={buttonStyle}>
                <span style={{ color: theme=="dark"?Colors.textDark:Colors.textLight }}><LinkRounded/></span>
              </a>
            </div>
        </div>
            
          <p style={{ marginTop: '8px' }}>
            <a target='_blank' href={linkProject} style={{ color: theme=='dark'?Colors.textDark:Colors.textLight, textDecoration: 'none', fontSize: '0.9rem' }}>
              {description}
            </a>
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'end', fontSize:'0.7rem'}}>
            <span style={{ color: "#FFF" }}>{likes || 0} <Favorite  fontSize='small'/></span>
            <span style={{ color: "#FFF" }}>{views || 0} <Visibility fontSize="small"/></span>
          </div>
        </div>
      </figure>

    </div>
  );
};

export default DribbbleShot;