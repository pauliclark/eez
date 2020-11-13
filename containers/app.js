let appContainer
export const setApp = app => {
    if (appContainer) throw new Error("App is already defined")
    appContainer = app
  }
export const getApp = () => {
    if (!appContainer) throw new Error("App is not defined")
    return appContainer
  }
