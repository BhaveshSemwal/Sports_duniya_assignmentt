import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { app, db } from "../firebase";

function Home() {
  const [role, setRole] = useState("");
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("tesla");
  const [fromDate, setFromDate] = useState("2025-06-01");
  const [toDate, setToDate] = useState("2025-06-20");
  const [authorFilter, setAuthorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState(""); // "news" or "blog"

  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) setRole(snap.data().role);
      }
    };
    fetchRole();
  }, [user]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=8a47e52921c842d48c1c20378b398529`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === "ok") {
          let filtered = data.articles;

          if (authorFilter) {
            filtered = filtered.filter((a) =>
              a.author?.toLowerCase().includes(authorFilter.toLowerCase())
            );
          }

          if (typeFilter) {
            filtered = filtered.filter((a) =>
              typeFilter === "news"
                ? a.title.toLowerCase().includes("news")
                : a.title.toLowerCase().includes("blog")
            );
          }

          setArticles(filtered);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, [query, fromDate, toDate, authorFilter, typeFilter]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col sm:flex-row justify-between items-center animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-700 animate-spin-slow tracking-wide">
          📰 Welcome to <span className="text-red-600">News24</span>
        </h1>

        <button
          onClick={handleLogout}
          className="mt-4 sm:mt-0 bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>

      <div className="bg-white px-6 py-4 rounded-lg shadow-md mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          {/* Keyword */}
          <div className="flex-1">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              type="text"
              placeholder="🔍 Search keyword (e.g. Tesla)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* From Date */}
          <div>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          {/* To Date */}
          <div>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* Author */}
          <div className="flex-1">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              type="text"
              placeholder="✍️ Filter by author"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No articles found.
          </p>
        ) : (
          articles.map((article, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="News Thumbnail"
                  className="w-full md:w-48 h-48 object-cover md:rounded-l-xl"
                />
              )}

              <div className="p-5 flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {article.description || "No description available."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
                  <p className="text-sm text-gray-500">
                    {article.author || "Unknown Author"} •{" "}
                    {new Date(article.publishedAt).toLocaleString()}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 sm:mt-0 text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                  >
                    Read full article →
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
