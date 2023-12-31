
"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * init of webpage
   */
  function init() {
    qs("h1").addEventListener("click", function() {
      window.location.href = "../index.html";
    });
    loadProduct();
    let sizes = qsa(".dropdown-item");
    clickedSize(sizes);
    buyNow();
  }

  /**
   * Loads the clicked product page with the item clicked and the data for it.
   */
  function loadProduct() {
    let pic = localStorage.getItem("clicked-product");
    document.getElementById("clicked-item").src = "../trending-sneaker/" + pic + ".jpeg";
    id("item-name").textContent = pic.replace(/-/g, ' ');
    id("lowest-ask").textContent = "Lowest Ask: " + localStorage.getItem("lowest-ask");
  }

  /**
   * Displays the click size
   * @param {Object} sizes - List of the sizes
   */
  function clickedSize(sizes) {
    for(let i = 0; i < sizes.length; i++) {
      sizes[i].addEventListener("click", function(event) {
        let clickSize = event.target.textContent;
        id("size-btn").textContent = clickSize;
        localStorage.setItem("clicked-size", clickSize);
      });
    }
  }

  function buyNow() {
    id("buy-btn").addEventListener("click", function() {
    let loged = localStorage.getItem("login");
    let size = id("size-btn").textContent;
    checkLoged(loged);
    chcekSizes(size);
    if(size !== "Sizes" && loged !== "false") {
      window.location.href = "purchase.html";
      confirmationDisplay();
    }
    });
  }

  function checkLoged(loged) {
    if(loged === "false") {
      id("no-log").classList.remove("hidden");
    } else {
      id("no-log").classList.add("hidden");
    }
  }

  function chcekSizes(size) {
    if(size === "Sizes") {
      id("no-size").classList.remove("hidden");
    } else {
      id("no-size").classList.add("hidden");
    }
  }

  function confirmationDisplay() {
    console.log("hey!")
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
