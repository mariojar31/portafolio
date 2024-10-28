"use client"
import next from "next";
import Image from "next/image";
import "../styles/header.css";
import { useEffect, useState } from "react";
import {Language, Menu as MenuIcon, DarkMode, LightMode, Style } from '@mui/icons-material';
import {Dropdown, MenuButton, Menu, MenuItem, Box, Drawer, Button ,List, Divider, ListItem, ListItemButton, ModalClose, DialogTitle} from '@mui/joy';
import Colors from '../colors';

type Lang = 'es' | 'en' | 'fr';
type LangFunction = (lang: Lang) => void;

interface NavbarProps {
    lang: string; // Especifica el tipo de la prop lang como string
    selectLang: LangFunction;
    theme: string;
    changeTheme: ()=>void;
  }

export function Navbar({ lang, selectLang, theme, changeTheme }:NavbarProps){

    const [openMenu, setOpenMenu] = useState(false);
    const [logotipoVisible, setLogotipoVisible] = useState(false);

    const handleScroll = ()=>{
        if(window.scrollY>310){
            setLogotipoVisible(true)
        }else{
            setLogotipoVisible(false)
        }
    };

    useEffect(()=>{
        window.addEventListener('scroll',handleScroll);

        return ()=>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[])
    
    const selectEs = () => {
        console.log('es');
        selectLang('es');
      };
    
    const selectEn = () => {
        console.log('en');
        selectLang('en');
      };

    const selectFr = () => {
        console.log('fr');
        selectLang('fr');
      };


    function openNav() {
        setOpenMenu(true);
        };

    function closeNav() {
        setOpenMenu(false);
    };


    return(
        <>
        <div className="container w-full" style={{zIndex:99}}>
           <div className="flex flex-row flex-no-wrap justify-between align-center fixed top-0 left-0 right-0"  style={theme==='dark'?{backgroundColor:"rgba(0,0,0,0.8)", zIndex:99}:{backgroundColor:"rgba(255,255,255,0.8)", zIndex:10}}>
                <div className="px-4 py-1">
                    <a href="#">
                        <Image id="logonav" className="logo-img" width= {70} height={70} src={theme === 'dark' ? ("/MA_logo-02.png") : ("/MA_logo-03.png")} alt="Imagen de logo Mario Acendra" priority/>
                    </a>
                </div>
                <div className={theme=='dark'?'menu_nav_dark':'menu_nav_light'}>
                    <ul className="hidden sm:flex flex-row justify-around flex-nowrap">
                        <li className="p-4  hover:opacity-50"><a href="#intro">{lang=='en'?"About":lang=='fr'?"À propos de moi":"Acerca de mí"}</a></li>
                        <li className="p-4  hover:opacity-50"><a href="#projects">{lang=='en'?"Projects":lang=='fr'?"Projects":"Proyectos"}</a></li>
                        <li className="p-4  hover:opacity-50"><a href="#academic">{lang=='en'?"Academic":lang=='fr'?"Académique":"Estudios"}</a></li>
                        <li className="p-4  hover:opacity-50"><a href="#contactme">{lang=='en' ? 'Contact Me': (lang=='fr')?'Contactez mo':'Contactame'}</a></li>
                    </ul>
                </div>
                <div className="px-4 py-1 hidden sm:flex">
                    <Button variant="plain" className="hover:opacity-50" onClick={changeTheme}>
                        {theme=='dark'?<LightMode style={{color:'#ffffff'}}/>:<DarkMode style={{color:'#000000'}}/>}
                    </Button>

                    <Dropdown>                        
                        <MenuButton variant="plain" className="hover:opacity-50"><Language style={{color:theme=='dark'?'#ffffff':'#000000'}} /></MenuButton>
                        <Menu>
                            <MenuItem onClick={selectEs}>ES</MenuItem>
                            <MenuItem onClick={selectEn}>EN</MenuItem>
                            <MenuItem onClick={selectFr}>FR</MenuItem>
                        </Menu>
                    </Dropdown>                    
                </div>

                <div className="inline py-3 sm:hidden"><h2 style={logotipoVisible==true?{color:'brown',fontSize:21,fontWeight:800,padding:7}:{display:'none'}}>Mario Acendra</h2></div>

                <div className="inline p-4 sm:hidden">
                    <Box sx={{ display: 'flex' }}>
                        
                        
                        <Button variant="plain" onClick={() => setOpenMenu(true)}>
                            <MenuIcon style={theme==='dark'?{color:'#FFFFFF', fontSize:25}:{color:'#000000', fontSize:25}}/>
                        </Button>
                        <Drawer open={openMenu} anchor="right" variant="plain" sx={{'& .MuiDrawer-content':{backgroundColor:theme=='dark'?Colors.drawerBgDarkColor:Colors.drawerBgLightColor, color:Colors.red},'& .MuiListItemButton-root':{color:theme=='dark'?Colors.textDark:Colors.textLight}}} onClose={() => setOpenMenu(false)}>
                            <ModalClose />
                            <Button variant="plain" className="hover:opacity-50" onClick={changeTheme}>
                                {theme=='dark'?<LightMode style={{color:'#ffffff'}}/>:<DarkMode style={{color:'#000000'}}/>}
                            </Button>
                            <DialogTitle>Mario Acendra</DialogTitle>
                            <List>
                                <ListItem>
                                    <ListItemButton>
                                        {lang=='en'?"About":lang=='fr'?"À propos de moi":"Acerca de mí"}
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        {lang=='en'?"Projects":lang=='fr'?"Projects":"Proyectos"}
                                    </ListItemButton>                                    
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        {lang=='en'?"Clients":lang=='fr'?"Clients":"Clientes"}
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        {lang=='en' ? 'Contact Me': (lang=='fr')?'Contactez mo':'Contactame'}
                                    </ListItemButton>
                                </ListItem>
                                <Divider/>
                                    <ListItem >                                      
                                        <ListItemButton  onClick={selectEs}>ES</ListItemButton>
                                        <ListItemButton  onClick={selectEn}>EN</ListItemButton>
                                        <ListItemButton  onClick={selectFr}>FR</ListItemButton>
                                    </ListItem>
                            </List>
                        </Drawer>
                    </Box>                        
                </div>



            </div>
             
        </div>
        </>
    )
}
