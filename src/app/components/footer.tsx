"use client"
import next from "next";
import { useEffect, useState } from "react";
import Colors from "../colors";
import {GitHub,LinkedIn,Mail} from '@mui/icons-material';


type LangFunction = (lang: string) => void;

interface NavbarProps {
    lang: string; // Especifica el tipo de la prop lang como string
    selectLang: LangFunction;
    theme: string;
    changeTheme: ()=>void;
  }
export default function Footer({lang, theme}:{lang:String,theme:String}){

    const date = new Date().getFullYear();

    return(
        <>
            <div className="text-center p-3">
                <div className="flex flex-row justify-center items-center">
                    <a className="p-3" style={theme=='dark'?{color:Colors.textDark}:{color:Colors.textLight}} href="">
                        <LinkedIn></LinkedIn>
                    </a>
                    <a className="p-3" style={theme=='dark'?{color:Colors.textDark}:{color:Colors.textLight}} href="">
                        <GitHub></GitHub>
                    </a>
                    <a className="p-3" style={theme=='dark'?{color:Colors.textDark}:{color:Colors.textLight}} href="">
                        <Mail></Mail>
                    </a>
                </div>
                <p style={theme=='dark'?{color:Colors.textDark}:{color:Colors.textLight}}>&copy; Mario Acendra - {date}</p>
            </div>
        </>
    )
}