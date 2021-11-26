import App from "./App.js"

export default class AppDOM {
  /**
   * Inserts components to HTML
   * @param {{ html: string, callback?: () => void}[]} component 
   * @param {string} elementId 
   */
  render(component, elementId) {
    component.forEach((item) => {
      const { str, callback } = item

      $(`#${elementId}`).append(str)
      
      if (callback) {
        callback()
      }
    })
  }
}

App(new AppDOM())