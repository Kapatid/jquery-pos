import App from "./App.js"

export default class AppDOM {
  /**
   * Inserts components to HTML
   * @param {{ strHTML: string, callback?: () => void}[]} component 
   * @param {string} elementId 
   */
  render(component, elementId) {
    component.forEach((item) => {
      const { strHTML, callback } = item

      $(`#${elementId}`).append(strHTML)
      
      if (callback) {
        callback()
      }
    })
  }
}

App(new AppDOM())