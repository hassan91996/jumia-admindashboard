import React, { useEffect, useState } from 'react';
import './sizes.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Add from '@mui/icons-material/Add';

const Sizes = (props) => {
    const [sizes, setsizes] = useState({});

    useEffect(() => {
        let Si = []
        if (props.initvalue && props.initvalue.length > 0) {
            let m = {}
            props.initvalue.forEach((size, i) => {
                m[i] = size
                Si.push(i)
            }
            )
            setsizes({ ...m })
        }
        else {
            setsizes({
                0: {
                    size: '',
                    quantity: ''
                }
            })
        }
    }, [props.initvalue]);


    useEffect(() => {
        let sizeValue = []
        let valid
        for (let size in sizes) {
            valid = true && sizes[size].size && (sizes[size].quantity || sizes[size].quantity === 0)
            sizeValue.push({
                size: sizes[size].size,
                quantity: sizes[size].quantity
            })
        }
        let sizesvalid = valid ? true : false
        props.onInput(props.name, sizeValue, sizesvalid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sizes]);


    const addSize = () => {
        let newS = Object.keys(sizes).length
        setsizes({
            ...sizes,
            [newS]: {
                size: '',
                quantity: ''
            }
        })

    }
    const deletesize = () => {
        let deleteS = Object.keys(sizes).length - 1
        if (deleteS > 0) {
            const newsizes = sizes
            delete newsizes[deleteS]
            setsizes({
                ...newsizes,
            })
        }

    }

    const setProductsizes = (e, c) => {
        setsizes({
            ...sizes,
            [c]: {
                ...sizes[c],
                size: e.target.value.toUpperCase()
            }
        })
    }
    const setsizequantity = (e, c) => {
        setsizes({
            ...sizes,
            [c]: {
                ...sizes[c],
                quantity: e.target.value
            }
        })
    }




    return (

        <div className='InputSizes'>
            <div className='sizesheader'>
                <p>المقاسات</p>
                <div className='Buttons'>
                    <button type='button' id='add' onClick={addSize}>اضافة مقاس<Add /></button>
                    <button type='button' id='delete' onClick={deletesize}>ازالة مقاس<DeleteForeverIcon /></button>
                </div>

            </div>
            <div className='sizeAdd'>
                {Object.keys(sizes).map(size => <div key={size}>
                    <input onChange={(e) => setProductsizes(e, size)} value={sizes[size].size} placeholder='المقاس' type="text" required />
                    <input onChange={(e) => setsizequantity(e, size)} value={sizes[size].quantity} placeholder='الكمية' type="number" required />
                </div>)}
            </div>

        </div>
    )
};

export default Sizes;
