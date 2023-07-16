# *StockY NEWS API* API Documenation
The StockY News API will provide new news by provding images to be use on the carousel for display.

**Request Format:** */news-imgs*

**Request Type:**: JSON

**Description**
Returns a JSON object of the news imgs src's.

**Example Request** */news-imgs*

**Example Response**

[
  "something.jpg", "image1.jpg", "image2.jpg"
]

**Error Handling:**
Possible 500 errors (all plain text):
  - If something were to go wrong with the server, returns an error message:
  "Error Loading Image From Server Side"