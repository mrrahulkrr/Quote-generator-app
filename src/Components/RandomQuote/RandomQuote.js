import React, { useEffect, useState } from "react";
import './RandomQuote.css'
// import BookmarksQuote from "../BookmarksQuote/BookmarksQuote";

const Home = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const fetchRandomQuote = () => {
    const apiUrl = "https://api.quotable.io/random";

    // Fetching a random quote using the fetch function
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parsing the JSON data from the response
      })
      .then((data) => {
        // Updated the state with the fetched quote and author information
        setQuoteData({
          quote: data.content,
          author: data.author,
        });
        console.log(data)
      })
      .catch((error) => {
        // Handled errors here
        console.error("Error fetching quote:", error);
      });
  };

  useEffect(() => {
    // Fetching a random quote when the component is mounted
    fetchRandomQuote();
  }, []);

  const addBookmark = () => {
    if (quoteData) {
      setBookmarks([...bookmarks, quoteData]);
    }
  };

  // const onClickBookmarkIcon = () => {
  //   <ul>

  //   </ul>
  //   <BookmarksQuote />
  // }

  return (
    <div>
      {quoteData ? (
        <div>
          <blockquote className="quote-container">
            <div className="quote">{quoteData.quote}</div>
            <div className="quote-footer">
            <p className="author">{quoteData.author}</p>
            <img
            onClick={addBookmark}
            className="bookmarks"
            src="https://png.pngtree.com/png-vector/20190423/ourmid/pngtree-bookmark-icon-vector-illustration-in-filled-style-for-any-purpose-png-image_975418.jpg" 
            alt="bookmarks" />
            </div>
          </blockquote>
          <button className="button" onClick={addBookmark}>Get Another Quote</button>
        </div>
      ) : (
        <p>Loading quote...</p>
      )}
    </div>
  );
};

export default Home
