import React, { useRef, useState, useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './ImageUpload.css';

const ImageUpload = ({ name, files, onInput, FormFactor }) => {
  const [file, setFile] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [images, setimages] = useState([])
  const [index, setindex] = useState(0)



  const filePickerRef = useRef();

  useEffect(() => {
    if (files && files.length > 0) {
      setFile([...files])
      setIsValid(true);
    }
    else {
      setFile([])
      setIsValid(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FormFactor])


  useEffect(() => {
    onInput(name, file, isValid);
    setimages([])
    if (file.length > 0) {
      for (const image of file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setimages(images => [...images, fileReader.result])
        };
        fileReader.readAsDataURL(image);
      }
      setindex(file.length - 1)
    }

  }, [file, onInput, isValid, name]);



  const pickedHandler = e => {
    let Cfiles = e.target.files
    if (file.length + Cfiles.length > 6) {
      return alert('العدد الاقصي 6 صور')
    }
    let Imgs = []
    if (Cfiles && e.target.files.length >= 1) {
      Object.keys(Cfiles).forEach(i => {
        Imgs.push(Cfiles[i])
      })
      setIsValid(true);
    } else {
      if(file.length + Cfiles.length < 1){
        setIsValid(false);
      }
    }
    setFile(f => [...f, ...Imgs])

  };


  const pickImageHandler = () => {
    if (file.length >= 6) {
      return alert('العدد الاقصي 6 صور')
    }
    filePickerRef.current.click();
  };


  const deletehandler = () => {
    if (file.length > 1) {
      let Files = file
      Files.splice(index, 1)
      setFile([...Files])
    }
    else {
      setFile([])
      setIsValid(false)
    }
  }


  return (
    <div className="imageupload">
      <input
        ref={filePickerRef}
        multiple
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="show">
        <div className="right">
          <div className='ButtonsArea'>
            <button type="button" id='add' disabled={file.length >= 6} onClick={pickImageHandler}>
              <AddPhotoAlternateIcon className="icon" />
              اضافة صورة
            </button>
            <button type="button" id='delete' disabled={file.length < 1} onClick={deletehandler}>
              <DeleteForeverIcon className="icon" />
              حذف صورة
            </button>
          </div>
          <div className="samllImages">
            {images.map((img, i) => <img alt="smallimage" key={i} src={img}
              className={index === i ? "active" : null} onClick={() => setindex(i)} />
            )}
          </div>
        </div>
        <div className="left">
          {images.length > 0 ? <img src={images[index]} alt="Preview" /> :
            <div>
              <AddPhotoAlternateIcon style={{ fontSize: "80px", color: "#555" }} />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
