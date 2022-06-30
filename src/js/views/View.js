import icons from 'url:../../img/icons.svg'; 

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const dataMarkup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', dataMarkup);
  }

  _clear() {
    this._parentEl.innerHTML = ''; // to clear the this._parentEl content
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
    this._parentEl.insertAdjacentHTML('afterbegin', spinnerMarkup);
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
    this._parentEl.insertAdjacentHTML('afterbegin', errorMarkup);
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
    this._parentEl.insertAdjacentHTML('afterbegin', successMarkup);
  }
}