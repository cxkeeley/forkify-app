import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the receive object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {Boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Darwin Keeley
   * @todo Finish implementation
   */
  
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const dataMarkup = this._generateMarkup();

    if (!render) return dataMarkup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', dataMarkup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        ); // to replace the attr from the newEl
    });
  }

  _clear() {
    this._parentElement.innerHTML = ''; // to clear the this._parentElement content
  }

  renderSpinner() {
    const spinnerMarkup = `
      <div class='spinner'>
        <svg>
          <use href='${icons}#icon-loader'></use>
        </svg>
      </div>;
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  renderError(message = this._errorMessage) {
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  renderMessage(message = this._successMessage) {
    const successMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', successMarkup);
  }
}
