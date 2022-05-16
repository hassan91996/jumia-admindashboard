import React, { useState, useEffect } from 'react'
import { checkValidity } from '../../../shared/checkvalid'
import './Input.css'

const Input = (props) => {
  const { validators, onInput, isvalid, lable, FormFactor, initvalue, elementType, half, options, ...config } = props
  const [valid, setvalid] = useState(isvalid ? isvalid : false)
  const [value, setvalue] = useState("")
  const [touch, settouch] = useState(false)

  useEffect(() => {
    if (isvalid) {
      setvalid(isvalid)
    }
    if (initvalue) {
      setvalue(initvalue)
      setvalid(true)

    } else {
      setvalue("")
      settouch(false)
    }

  }, [initvalue, isvalid, FormFactor])
  useEffect(() => {
    onInput(props.name, value, valid)
  }, [props.name, value, valid, onInput]);

  const changehandler = (e) => {
    setvalue(e.target.value)
    setvalid(checkValidity(e.target.value, validators))
  }
  const blurhandler = (e) => {
    settouch(true)
    setvalid(checkValidity(e.target.value, validators))
  }

  let element
  switch (elementType) {
    case "input": element = <input className="input"
      {...config}
      onChange={changehandler}
      onBlur={blurhandler}
      value={value} />
      break;
    case "textarea": element = <textarea className="textarea"
      {...config}
      onChange={changehandler}
      onBlur={blurhandler}
      value={value} />
      break;
    case "select": element = <select className="select"
      value={value}
      onChange={changehandler} >
      <option value="" >{lable}</option>
      {options && options.map(element => {
        return <option key={element.value} value={element.value} >{element.display}</option>
      })}
    </select>
      break;
    default: element = <input {...config}
      onChange={changehandler}
      onBlur={blurhandler}
      value={value} />
      return element
  }



  return (
    <div className="Inputcontainer" style={half && { width: "40%" }}>
      {lable && <span className="lable">{lable}</span>}
      <div className={`Input ${!valid && touch && 'invalid'}`}>
        {element}
        {props.icon && <div className="Iconcontaniner"> {props.icon}</div>}
      </div>
      {!valid && touch && <span className="error">معلومات غير صحيحة</span>}
    </div>

  )
}



export default Input

