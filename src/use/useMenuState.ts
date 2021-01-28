
interface IMenuState {
  fullMenu: boolean;
  topBarTitle: string;
}

export const useMenuState = (route): IMenuState => {
  const menuStateObject: IMenuState = {
    fullMenu: true,
    topBarTitle: ''
  }

  menuStateObject.fullMenu = (route.name === 'Home')

  switch (route.name.toLowerCase()) {
    case 'editmoods':
      menuStateObject.topBarTitle = 'Moods'
      break
    case 'habits':
      menuStateObject.topBarTitle = 'Habits'
      break
    case 'settings':
      menuStateObject.topBarTitle = 'Settings'
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
