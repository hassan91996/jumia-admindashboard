import React, { useState, useEffect } from 'react'
import { useSelector, } from 'react-redux'
import './CategoriesTree.css'


const CategoriesTree = ({ handleClick, selected, groupName }) => {
    const [subcCategories, setsubCategories] = useState([])
    const [actives, setactive] = useState([])
    const Categories = useSelector(state => state.categories.categories)
    
    useEffect(() => {
        let Actives = document.querySelectorAll(`.${groupName}`);
        if (Actives && Actives.length > 0) {
            for (let i of Actives) {
                if (i.className.includes('Parent')) {
                    if (selected._id !== i.id) {
                        i.className = [`${groupName}`, 'Parent',
                        actives.includes(i.id) ? 'active expand' : null].join(' ')
                    } else {
                        i.className = [`${groupName}`, 'cliked', 'Parent', actives.includes(i.id) ? 'expand' : null].join(' ')
                    }
                } else {
                    if (selected._id !== i.id) {
                        i.className = [`${groupName}`, actives.includes(i.id) ? 'active' : null].join(' ')
                    } else {
                        i.className = [`${groupName}`, 'cliked'].join(' ')
                    }
                }

            }
        }
    }, [actives, selected,groupName])

    const categoriesTree = (categories, ord, id) => {
        setactive(act => [...act.slice(0, ord), id])
        setsubCategories(sub => [
            ...sub.slice(0, ord),
            categories.length > 0 && <ul key={ord}>{categories.map((subCat) => <li key={subCat._id} onClick={() => handleClick(subCat)}
                className={[`${groupName}`, subCat.children.length > 0 ? 'Parent' : null].join(' ')}
                id={subCat._id}
                onMouseEnter={() => categoriesTree(subCat.children, ord + 1, subCat._id)}
            >
                {subCat.name}
            </li>)}
            </ul>
        ]
        )
    }

    return (
        <div className='Tree'>
            <ul >{Categories && Categories.map(cat => <li key={cat._id} onClick={() => handleClick(cat)}
                className={[actives.includes(cat._id) ?
                    'active' :
                    null, selected._id === cat._id ? 'cliked'
                    : null, cat.children.length > 0 ? (actives.includes(cat._id) ? 'expand' : 'Parent') : null
                ].join(' ')}
                onMouseEnter={() => categoriesTree(cat.children, 0, cat._id)}>
                {cat.name}
            </li>)}</ul>
            {subcCategories.map(category => category)}
        </div >
    )
}

export default CategoriesTree
