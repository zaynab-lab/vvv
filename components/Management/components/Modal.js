import { useState } from "react";
import { styles } from "../../../public/js/styles";

export default function Modal({ children, add, modalOn }) {
  const [displayAdd, setDisplayAdd] = useState("none");
  const [displayEdit, setDisplayEdit] = useState(false);

  return (
    <>
      {add ? (
        <>
          <div className="addmodal">
            <div
              className="modal-background"
              onClick={() => setDisplayAdd("none")}
            ></div>
            <div className="modal-body">{children}</div>
          </div>
          <div className="addproductbtn" onClick={() => setDisplayAdd("block")}>
            +
          </div>
        </>
      ) : (
        displayEdit && (
          <div className="editmodal">
            <div
              className="modal-background"
              onClick={() => setDisplayEdit(false)}
            ></div>
            <div className="modal-body">{children}</div>
          </div>
        )
      )}
      <style>{`


.addproductbtn{
position: absolute;
top:90vh;
left:1rem;
background:${styles.primaryColorLight};
color:white;
width:3rem;
height:3rem;
border-radius:5rem;
display:flex;
justify-content:center;
align-items:center;
font-size:2rem;
}


.addmodal{
position: absolute;
top:0;
display:${displayAdd}
}

.modal-background{
width:100vw;
height:100vh;
background:rgba(10, 10, 10, .5);
position: absolute;
top:0;
z-index:5;

}


.modal-body{
display:flex;
flex-direction:column;
width:90vw;
height:80vh;
background:white;
position:absolute; 
top:10vh;
right:5vw;
border:1px solid ${styles.primaryColorLight};
border-radius:.5rem;
padding:.5rem;
z-index:6;
overflow:auto;
}

`}</style>
    </>
  );
}
