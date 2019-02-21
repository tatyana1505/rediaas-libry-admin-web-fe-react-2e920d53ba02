import { actions } from './actions'
import { routes } from '../../config/routes.config'

const defaultState = {
  selectedMainMenu: routes.home,
  selectedMenu: '',
  selectedSubmenu: ''
}

export const reducer = (state = defaultState, action) => {
  // TODO: This should be moved somewhere else...
  let item = ''
  if(action.payload && action.payload.selectedMenu === state.selectedMenu) {
    item = {
      ...state,
      selectedMenu: '',
      selectedSubmenu: ''
    }
  } else if(action.payload) {
    item = {
      ...state, 
      selectedMenu: action.payload.selectedMenu,
      selectedSubmenu: ''
    }
  }

  switch (action.type) {
    case actions.MAIN_MENU_CHANGE:
      return {
        selectedMainMenu: action.payload.selectedMainMenu,
        selectedMenu: '',
        selectedSubmenu: ''
      }
    case actions.MENU_CHANGE:
      return item
    case actions.SUBMENU_CHANGE:
      return {
        ...state,
        selectedSubmenu: action.payload.selectedSubmenu,
        selectedMenu: action.payload.selectedMenu
      }
    default:
      return state
  }
}