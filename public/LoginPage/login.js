
"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * init of webpage
   */
  function init() {
    console.log("here");
    let logOptions = qsa(".log-type");
    for(let i = 0; i < logOptions.length; i++) {
      logOptions[i].addEventListener("click", changeOption);
    }
    qs("h1").addEventListener("click", function() {
      window.location.href = "/index.html";
    });
    sendLogin();
  }


  function changeOption() {
    if (id("login-option-l").classList.contains("underline")) {
      id("login-option-l").classList.remove("underline");
      id("login-option-s").classList.add("underline");
      id("sign-up").classList.remove("hidden");
      id("login-page").classList.add("hidden");
    } else {
      id("login-option-l").classList.add("underline");
      id("login-option-s").classList.remove("underline");
      id("sign-up").classList.add("hidden");
      id("login-page").classList.remove("hidden");
    }
  }

  function sendLogin() {
    let email = document.querySelector('#login-page input[name="user"][placeholder="Email Address"]');
    let password = document.querySelector('#login-page input[name="password"][placeholder="Password"]');
    let loginBtn = id("login-btn");
    loginBtn.addEventListener("submit", function(event) {
      event.preventDefault();
      fetchLogin(email.value, password.value);
    });
  }

  function fetchLogin(email, password) {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    fetch("/login", {method: "POST", body: formData})
      .then(statusCheck)
      .then(res => res.text())
      .then(grantAcess)
      .catch(console.error);
  }

  function grantAcess() {

  }


  /** ------------------------------ Helper Functions  ------------------------------ */
  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Note: You may use these in your code, but remember that your code should not have
   * unused functions. Remove this comment in your own code.
   */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

})();
