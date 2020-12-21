import { useState } from "react";

export default function Image({ name, img, id, setFile }) {
  const [filesrc, setFilesrc] = useState(`/img/png/${img ? id : name}.png`);
  const handleChange = (e) => {
    var file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      reader.readyState === 2
        ? setFilesrc(reader.result)
        : setFilesrc(`/${id}.png`);
    };

    if (file && file.type.match("image.png")) {
      reader.readAsDataURL(file);
      var blob = file.slice(0, file.size, "image/png");
      var newFile = new File([blob], id, { type: "image/png" });
      // setFile(newFile);
    }
  };

  return (
    <>
      <div>
        <label id="imglabel" htmlFor="imgInput">
          <img id="img" src={filesrc} alt="" />
        </label>

        <input
          type="file"
          id="imgInput"
          name="img"
          onChange={(e) => handleChange(e)}
          accept="image/x-png"
        />
      </div>

      <style jsx>{`
        #imgInput {
          opacity: 0;
          position: absolute;
          z-index: -1;
          width: 5rem;
        }
        #imglabel,
        #img {
          cursor: pointer;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          border: 1px var(--grey-dark-2) solid;
          font-size: 2rem;
          height: 8rem;
          width: 8rem;
          opacity: 90%;
          border-radius: 10rem;
          -webkit-border-radius: 10rem;
          -moz-border-radius: 10rem;
          -ms-border-radius: 10rem;
          -o-border-radius: 10rem;
          padding: 0.2rem;
        }
      `}</style>
    </>
  );
}
