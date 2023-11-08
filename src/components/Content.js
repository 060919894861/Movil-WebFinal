import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import PersonaLogo from "../images/Person.jpg";

const Content = () => {
  const [tweets, setTweets] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newTweet, setNewTweet] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tweets"),
      (querySnapshot) => {
        const tweetsData = [];

        querySnapshot.forEach((doc) => {
          tweetsData.push({ id: doc.id, ...doc.data() });
        });

        setTweets(tweetsData);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddComment = async (tweetId) => {
    if (newComment.trim() !== "") {
      const tweetRef = doc(db, "tweets", tweetId);

      try {
        const tweetDoc = await getDoc(tweetRef);
        if (tweetDoc.exists()) {
          const existingComments = tweetDoc.data().comments || [];
          const updatedComments = [...existingComments, newComment];
          await updateDoc(tweetRef, {
            comments: updatedComments,
          });
        }
      } catch (error) {
        console.error("Error al agregar comentario:", error);
      }

      setNewComment("");
    }
  };

  const handleAddNewTweet = async () => {
    if (newTweet.trim() !== "") {
      try {
        const newTweetData = {
          text: newTweet,
        };
        const docRef = await addDoc(collection(db, "tweets"), newTweetData);

        setTweets((prevTweets) => [
          { id: docRef.id, ...newTweetData },
          ...prevTweets,
        ]);

        setNewTweet("");
      } catch (error) {
        console.error("Error al agregar el nuevo tweet:", error);
      }
    }
  };

  return (
    <div className="flex-1 bg-white border-r border-l border-gray-200 max-h-screen overflow-y-auto">
      <div className="p-4">
        <div className="text-xl font-bold mb-4">Home</div>
        <div>
          <div className="mb-4">
            <textarea
              placeholder="What's happening?"
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              className="bg-primary-base hover-bg-primary-dark text-white shadow-lg rounded-full py-3 px-6 w transform transition-colors duration-200 mt-2"
              onClick={handleAddNewTweet}
            >
              Tweet
            </button>
          </div>

          {tweets.map((tweet) => (
            <div key={tweet.id} className="bg-white rounded-lg p-4 border border-gray-300 mb-4">
              <div className="flex">
                <img src={PersonaLogo} alt="Profile" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <div className="font-bold">User</div>
                </div>
              </div>
              <div className="mt-4">{tweet.text}</div>
              {tweet.comments && (
                <div className="mt-2">
                  <ul>
                    {tweet.comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className="bg-primary-base hover-bg-primary-dark text-white shadow-lg rounded-full py-3 px-6 w transform transition-colors duration-200"
                  onClick={() => handleAddComment(tweet.id)}
                >
                  Add Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;