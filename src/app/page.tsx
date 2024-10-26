"use client"
import Image from "next/image";
import { Navbar } from "./components/header";
import Intro from "./components/intro";
import { useState, useEffect } from "react";
import Skills from "./components/skills";
import Academic from "./components/academic";
import Projects from "./components/projects";
import Footer from "./components/footer";
import Colors from "./colors";
import styles from './gradient.module.css';

export default function Home() {

  const [lang, setLang]=useState('es');

  const [theme, setTheme] = useState('light');

  useEffect(()=>{
      const setColorTheme = ()=>{
        const storedTheme = localStorage.getItem('theme')
        if(storedTheme){
          setTheme(storedTheme)
        }else{
          const colorTheme = matchMedia('(prefers-color-scheme: dark)').matches;
          setTheme(colorTheme ? 'dark' : 'light');
        }
      };
      setColorTheme();
  },[]);

  const handleTheme = ()=>{
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme);
    localStorage.setItem('theme',newTheme)
  }


  function selectLang(lang:string){
    setLang(lang);
  }

  useEffect(()=>{
    if(typeof navigator !== 'undefined'){
      var language = navigator.language;
  
      if(language.startsWith('es')){
        setLang('es')
      }else if(language.startsWith('en')){
        setLang('en')
      }else if(language.startsWith('fr')){
        setLang('fr')
      }
    }

  },[]);


  return (
    <>
    <div style={theme==='dark'?{backgroundColor:'black',width:'100%'}:{backgroundColor:'white'}}>
      <Navbar lang={lang} selectLang={selectLang} theme={theme} changeTheme={handleTheme}></Navbar>
      <Image className="hidden sm:block fixed" style={{position: "fixed", top: 68, left: 0, width:"100%", height:'auto', zIndex:0, pointerEvents:'none'}} width= {1281} height={393} src="/glow.png" alt="Glow effect" priority/>
      
      
      <Intro lang={lang} theme={theme}/>
      <Skills lang={lang} theme={theme}/>
      <Projects lang={lang} theme={theme}/>
      <Academic lang={lang} theme={theme}/>
      <Footer lang={lang} theme={theme}></Footer>
    </div>

    </>
  );
}
