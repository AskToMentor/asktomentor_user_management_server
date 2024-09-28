const fieldValidator = require( "../utils/fieldValidator.js");

const getMenuList = (menus, parentId = false || null) => {
    console.log("menus", menus);
    
    const menuListArray = [];
    let parentMenuId;

    if (!parentId)
        parentMenuId = menus.filter(el => !el.parentId);
    else 
        parentMenuId = menus.filter(el => el.parentId === parentId);

    console.log("parentMenuId", parentMenuId);

    for (const menu of parentMenuId){
        menuListArray.push({
            categoryName: menu.categoryName,
            children: getMenuList(menus, menu.categoryId),
            icon: menu.icon,
            id: menu.categoryId,
            imageUrl: menu.imageUrl,
            parentId: menu.parentId,
            status: menu.status
        });
    }

    return menuListArray;
};

module.exports = getMenuList;