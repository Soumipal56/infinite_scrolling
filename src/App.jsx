import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_limit=12&_page=${page}`,
    );

    const data = response.data;

    setPostData(prev=> [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  console.log(postData);


  console.log(page)

  const handleScroll = async () => {
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);

    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
      setPage(prev=> prev + 1);
      setLoading(true);
    }
  };

  console.log(postData);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-screen p-2">
      <h1 className="text-xl font-bold text-center mb-10">
        Infinite Scrolling
      </h1>
      <div className="grid grid-cols-4 gap-4 w-full p-2 mt-4">
        {postData.map((item) => (
          <div
            key={item.id}
            className="h-80 rounded-md bg-gray-200 p-4 flex items-center justify-center"
          >
            <h1 className="text-center">{item.title}</h1>
          </div>
        ))}
      </div>
      {loading && <p className="w-full p-2 text-center">Loading...</p>}
    </div>
  );
};

export default App;
