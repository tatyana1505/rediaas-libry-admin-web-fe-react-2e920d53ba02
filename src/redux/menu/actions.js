export const actions = {
  MAIN_MENU_CHANGE: 'MENU/MAIN_MENU_CHANGE',
  MENU_CHANGE: 'MENU/MENU_CHANGE',
  SUBMENU_CHANGE: 'MENU/SUBMENU_CHANGE'
}

export const mainMenuChange = selectedItem => ({
  type: actions.MAIN_MENU_CHANGE,
  payload: {
    selectedMainMenu: selectedItem
  }
})

export const menuChange = selectedItem => ({
  type: actions.MENU_CHANGE,
  payload: {
    selectedMenu: selectedItem
  }
})

export const submenuChange = (selectedSubmenuItem, selectedMenuItem) => ({
  type: actions.SUBMENU_CHANGE,
  payload: {
    selectedSubmenu: selectedSubmenuItem,
    selectedMenu: selectedMenuItem
  }
})