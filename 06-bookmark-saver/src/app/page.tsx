"use client";
import { useState, useEffect } from "react";
interface Bookmark {
  id: number;
  name: string;
  url: string;
  description: string;
}
export default function Page() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true);
    const saved = localStorage.getItem("myBookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("myBookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks, isMounted]);

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = url;
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    const newBookmark = {
      id: Date.now(),
      name: name,
      url: finalUrl,
      description: description,
    };
    setBookmarks([...bookmarks, newBookmark]);
    setName("");
    setUrl("");
    setDescription("");
  };
  const handleDeleteBookmark = (id: number) => {
    const updateBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updateBookmarks);
  };
  if (!isMounted) return null;
  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-linear-to-r from-lime-300 to-lime-500 px-4 py-8 md:flex-row md:gap-10 md:py-10">
        <form
          id="bookmark-add-area"
          className="flex h-auto w-full max-w-md flex-col items-center gap-3 rounded-lg border border-none bg-cyan-400 p-6 shadow-md md:w-96 md:p-8"
          onSubmit={handleAddBookmark}
        >
          <p className="font-sans text-base font-semibold">Add Bookmark</p>
          <input
            id="name-input"
            type="text"
            className="w-full h-12 p-2 border border-none rounded-xl bg-white "
            placeholder="Bookmark name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            id="url-input"
            type="text"
            className="w-full h-12 p-2 border border-none rounded-xl bg-white "
            placeholder="Bookmark URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
          <textarea
            name="description"
            id="description-input"
            className="w-full h-24 bg-white border border-none rounded-xl p-3 shadow-md"
            placeholder="Enter description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="bg-green-500 border border-none rounded-2xl p-3 mt-4 hover:bg-green-400 active:bg-green-300 text-white">
            Add Bookmark
          </button>
        </form>
        <section
          id="bookmark-area"
          className="flex h-auto w-full max-w-md flex-col items-center gap-3 rounded-lg border border-none bg-cyan-400 p-3 shadow-md md:w-96"
        >
          <p className="font-sans text-base font-semibold">Bookmarks</p>
          {bookmarks.length === 0 && <p>You can add a bookmark on left...</p>}
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="flex flex-col w-full h-auto bg-white border border-none rounded-xl p-4 shadow-md"
            >
              <h3 className="font-sans text-base font-semibold text-stone-800">
                {bookmark.name}
              </h3>
              <a
                className="wrap-break-word font-sans text-base text-blue-500 md:text-xl"
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {bookmark.url}
              </a>
              <p className=" font-sans text-stone-800">
                {bookmark.description}
              </p>
              <button
                onClick={() => handleDeleteBookmark(bookmark.id)}
                className="bg-red-500 text-white font-sans text-sm px-4 py-2 rounded-lg mt-2 hover:bg-red-600 active:bg-red-700 w-fit self-end"
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
