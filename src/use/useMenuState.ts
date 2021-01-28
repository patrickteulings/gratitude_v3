
interface IMenuState {
  fullMenu: boolean;
  topBarTitle: string;
}

export const useMenuState = (route): IMenuState => {
  const menuStateObject: IMenuState = {
    fullMenu: true,
    topBarTitle: ''
  }

  if (!route) {
    menuStateObject.fullMenu = true
    menuStateObject.topBarTitle = ''
    return menuStateObject
  } else if (route.name === 'Home') {
    menuStateObject.fullMenu = true
    menuStateObject.topBarTitle = ''
  } else {
    menuStateObject.fullMenu = false
  }

  menuStateObject.fullMenu = (route.name === 'Home')

  console.log('STATE.fullMenu', menuStateObject.fullMenu)

  switch (route.name) {
    case 'editMoods':
      menuStateObject.topBarTitle = 'Moods'
      break
    case undefined:
      menuStateObject.topBarTitle = 'NoTitle'
      break
    default:
      menuStateObject.topBarTitle = ''
      break
  }

  return menuStateObject
}
