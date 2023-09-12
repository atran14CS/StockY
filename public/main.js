
"use strict";
(function() {

  window.addEventListener("load", init);

  function init() {
    id("header").addEventListener("click", returnMain);
    loadTrendingSnrks();
  }

  //redirects to homepage upon clicking on the STOCK Y
  function returnMain() {
    window.location.href = "index.html";
  }

  //sends an api request to the fetch endpoint if successful covert to json and enter
  //display new. Otherwise console the error.
  function loadTrendingSnrks() {
    fetch('/trending/snekaers')
    .then(statusCheck)
    .then(res => res.json())
    .then(displayNew)
    .catch(console.error);
  }

  //Goes through the trending shoe data and creates dom elements to display the shoes.
  function displayNew(data) {
    for(let i = 0; i < data.length; i++) {
      let section = gen("section");
      section.classList.add("trending-card");
      let img = gen("img");
      let lowestAsk = gen("p");
      let sold = gen("p");
      img.src = "trending-sneaker/" + data[i].Name +".jpeg";
      img.alt = data[i].Name;
      lowestAsk.textContent = "Lowest Ask " + data[i].LowestAsk;
      sold.textContent = "Sold " + data[i].Sold;
      section.appendChild(img);
      section.appendChild(lowestAsk);
      section.appendChild(sold);
      id("trending-display").appendChild(section);
    }
    addClickEventAndStoreAlt(data);
  }

  //gives each tredning shoe an event and will store the shoe alt that is clicked on.
  function addClickEventAndStoreAlt(data) {
    let trending = qsa("img");
    for (let i = 0; i < trending.length; i++) {
      trending[i].addEventListener("click", function(event) {
        let product = event.currentTarget.alt;
        localStorage.setItem("clicked-product", product);
        for(let i = 0; i < data.length; i++) {
          if(data[i].Name == product) {
            localStorage.setItem("lowest-ask", data[i].LowestAsk);
          }
        }
        window.location.href = "productpage/product.html";
      });
    }
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
