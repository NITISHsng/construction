import React, { useState, useEffect, useRef } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useData } from "../pages/DataContext";
import { collection, addDoc } from "firebase/firestore"; // ✅ Import addDoc and collection
import { db } from "../firebase/firebase"; // ✅ Make sure this is already imported

const Testimonials = ({ user }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const commentsRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [userImgURL, setUserImgURL] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [animateBox, setAnimateBox] = useState(false);

  const { comments, setComments } = useData();

  // Show animation when comment box appears
  useEffect(() => {
    if (showCommentBox) {
      setTimeout(() => setAnimateBox(true), 10);
    }
  }, [showCommentBox]);

  // Cancel comment box
  const handleCancel = () => {
    setAnimateBox(false);
    setTimeout(() => setShowCommentBox(false), 1000);
  };

  // Get user info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserName(currentUser.displayName);
        setUserImgURL(currentUser.photoURL);
      }
    });

    return () => unsubscribe();
  }, []);

  // Calculate average rating
  const totalRating = comments.reduce((acc, t) => acc + (t.rating || 0), 0);
  const averageRating =
    comments.length > 0 ? (totalRating / comments.length).toFixed(1) : "0.0";

  // Handle new comment submission
  const handleAddComment = async () => {
    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }
    if (rating < 1 || rating > 5) {
      alert("Please provide a valid rating (1–5 stars).");
      return;
    }

    const newComment = {
      comment,
      userName,
      userImgURL,
      rating,
      timestamp: new Date(),
    };

    try {
      // ✅ Add comment to Firestore
      await addDoc(collection(db, "comments"), newComment);

      // ✅ Add comment to local state
      setComments([...comments, newComment]);

      // ✅ Reset form
      setComment("");
      setRating(0);
      setShowCommentBox(false);
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Something went wrong while saving your comment.");
    }
  };

  // Scroll to next comments
  const nextComments = () => {
    if (commentsRef.current && comments.length > 0) {
      const nextIndex = (currentIndex + 1) % comments.length;
      setCurrentIndex(nextIndex);
      commentsRef.current.scrollBy({ left: 754, behavior: "smooth" });
    }
  };

  // Scroll to previous comments
  const prevComments = () => {
    if (commentsRef.current && comments.length > 0) {
      const prevIndex = (currentIndex - 1 + comments.length) % comments.length;
      setCurrentIndex(prevIndex);
      commentsRef.current.scrollBy({ left: -754, behavior: "smooth" });
    }
  };

  return (
    <section id="comments" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <h2 className="text-5xl sm:text-3xl font-semibold">EXCELLENT</h2>
            <div className="flex justify-center  text-yellow-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={`text-4xl ${
                    index < Math.round(averageRating)
                      ? "opacity-100"
                      : "opacity-30"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-4xl sm:text-xl">
              {averageRating}/5 Based on {comments.length} reviews
            </p>
          </div>

          <h1 className="text-4xl font-semibold sm:text-3xl text-gray-800 mb-4">
            What Our Clients Say
          </h1>
          <p className="text-3xl text-gray-600">
            Don't just take our word for it — hear what our satisfied clients
            have to say.
          </p>
        </div>

        {/* comments Carousel */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            className="absolute text-4xl left-[-50px] bg-white p-3 rounded-full shadow-md cursor-pointer text-gray-700"
            onClick={prevComments}
          >
            ←
          </button>

          {/* comments Cards */}
          <div
            ref={commentsRef}
            className="flex space-x-4 no-scrollbar  overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            {comments
              .slice()
              .reverse()
              .map((commentItem, index) => (
                <div
                  key={index}
                  className=" p-4 m-4 ml-7 rounded-lg shadow-lg border-t-4 border-primary  min-w-[500px] min-h-[300px]"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      className="size-16 lg:size-20 md:size-18 rounded-full border border-gray-300"
                      src={commentItem.userImgURL}
                      alt="user"
                    />
                    <span className="text-2xl font-semibold text-gray-800">
                      <div>{commentItem.userName || "Anonymous"}</div>
                      <div className="text-xl font-normal text-gray-500">
                        {commentItem.timestamp?.seconds
                          ? new Date(
                              commentItem.timestamp.seconds * 1000
                            ).toLocaleString()
                          : "just now"}
                      </div>
                    </span>
                  </div>

                  <div className="flex mt-2">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={`text-yellow-500 sm:text-xl lg:text-2xl ${
                          starIndex < commentItem.rating
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <blockquote
                    style={{
                      display: "block",
                      maxHeight: "120px",
                      overflowY: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                    className="mt-2 sm:text-xl md:2xl text-gray-600 italic custom-scrollbar"
                  >
                    {commentItem.comment.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </blockquote>
                </div>
              ))}
          </div>

          {/* Right Arrow */}
          <button
            className="absolute text-4xl right-[-50px] bg-white p-3 rounded-full shadow-md cursor-pointer text-gray-700"
            onClick={nextComments}
          >
            →
          </button>
        </div>

        {/* Add Comment Section */}
        <div className="mt-8">
          {!showCommentBox && (
            <div className="text-center mt-12">
              <button
                className="px-6 text-4xl py-3 border border-gray-300 rounded-md transition-all duration-300 hover:bg-[rgb(25,25,120)] hover:text-white"
                onClick={() => {
                  if (user) {
                    setShowCommentBox(true);
                  } else {
                    alert("Please create an account first!");
                  }
                }}
              >
                Write a Comment
              </button>
            </div>
          )}

          {/* Comment Input Box */}
          {showCommentBox && (
            <div
              className={`mt-4 transform transition-all duration-1000 ease-in-out ${
                animateBox
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
            >
              <div className="inline space-x-2 mb-4 ml-4 px-2 relative top-3 bg-gray-50">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-5xl cursor-pointer ${
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                value={comment}
                className="w-full p-2 h-50 border rounded text-3xl"
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
              />

              <button
                className="mt-2 bg-gray-500 text-4xl text-white px-4 py-3 rounded hover:bg-gray-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                className="m-2 bg-green-500 text-4xl text-white px-4 py-3 rounded hover:bg-green-600"
              >
                Post Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
