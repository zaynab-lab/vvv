import { useEffect, useState } from "react";
export default function SnakBar({ message }) {
  const [msg, setMsg] = useState(message);

  useEffect(() => {
    setTimeout(setMsg("jhjj"), 3000);
  }, [msg]);

  return (
    <>
      <div className="cont">
        <div className="snkcontainer">{msg}</div>
      </div>
      <style>{`
      .cont{
        display:block;
        position:absolute;
        bottom:1.5rem;
        width:100%;
        animation: fade ease 2s;
        -webkit-animation: fade ease 2s;
      }
      .snkcontainer{
        background:grey;
        min-width:10rem;
        padding:.8rem;
        border-radius:3rem;
        color:white;
        text-align:center;
        width:fit-content;
        margin:auto;    
        z-index:20;
      }
      
      @keyframes fade {
        0% {opacity:0;}
        100% {opacity:1;}
        0% {opacity:0;}
      }
      
      @-moz-keyframes fade {
        0% {opacity:0;}
        100% {opacity:1;}
        0% {opacity:0;}
      }
      
      @-webkit-keyframes fade {
        0% {opacity:0;}
        100% {opacity:1;}
        0% {opacity:0;}
      }
      
      @-o-keyframes fade {
        0% {opacity:0;}
        100% {opacity:1;}
        0% {opacity:0;}
      }
      
      @-ms-keyframes fade {
        0% {opacity:0;}
        100% {opacity:1;}
        0% {opacity:0;}
      }
      `}</style>
    </>
  );
}
