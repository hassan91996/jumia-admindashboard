export const categorylist = (categoryList, linercategories = [], parentId, parentName) => {
    if (categoryList) {
        for (let i of categoryList) {
            linercategories.push({
                value: i._id,
                parentId: parentId,
                name: i.name,
                display: parentName ? `${parentName}-${i.name}` : i.name,
            })
            if (i.children.length > 0) categorylist(i.children, linercategories, i._id, i.name)
        }
    }
    return linercategories 
}