import { useEffect, useState } from 'react'
import './CategorySelect.css'
import CategoriesTree from '../categories/CategoriesTree'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClearIcon from '@mui/icons-material/Clear';
const CategorySelect = ({ handleClick, selected, groupName, placeholder, lable,setselected }) => {
    const [expand, setexpand] = useState(false)


    useEffect(() => {
        if (selected) {
            setexpand(false)
        }
    }, [selected])
    return (
        <div className='SelectCategory'>
            <>
            {lable&&<span className='Catlable'>{lable}</span>}
                <div className='SelectInput'>
                    {selected._id ? <p>
                        {selected.name}
                    </p> : <span>
                        {placeholder}
                    </span>}
                    <div className='ExpandIcon'>
                        {expand ? <KeyboardArrowUpIcon onClick={() => setexpand(!expand)} /> : <KeyboardArrowDownIcon  onClick={() => setexpand(!expand)}/>}
                        {selected._id &&setselected&&<ClearIcon onClick={setselected}/>}
                    </div>
                </div>
            </>

            <div className='CatTree' style={{ display: expand ? 'block' : 'none' }} >
                <CategoriesTree
                    selected={selected}
                    handleClick={handleClick}
                    groupName={groupName}
                />
            </div>
        </div>

    )
}

export default CategorySelect