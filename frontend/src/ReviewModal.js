import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewModal({ productId, onClose }) {
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [userIdentifier, setUserIdentifier] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch existing reviews
    axios.get(`http://localhost:5000/products/${productId}/reviews`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('Error fetching reviews:', err));
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/reviews', {
        product_id: productId,
        rating: parseInt(rating),
        review_text: reviewText,
        user_identifier: userIdentifier,
        image_url: null
      });
      alert('Review submitted!');
      setRating('');
      setReviewText('');
      setUserIdentifier('');
      // Refresh reviews
      const updated = await axios.get(`http://localhost:5000/products/${productId}/reviews`);
      setReviews(updated.data);
    } catch (err) {
      alert(err?.response?.data?.error || 'Submission failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Submit Review</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name or email"
            className="w-full border p-2 mb-3"
            value={userIdentifier}
            onChange={e => setUserIdentifier(e.target.value)}
            required
          />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1–5)"
            className="w-full border p-2 mb-3"
            value={rating}
            onChange={e => setRating(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your review"
            className="w-full border p-2 mb-3"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-500">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Previous Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {reviews.map((review) => (
                <li key={review.id} className="border-b pb-2">
                  <div className="text-yellow-600 font-semibold">⭐ {review.rating}</div>
                  <p className="text-sm text-gray-800">{review.review_text}</p>
                  <p className="text-xs text-gray-500 italic">— {review.user_identifier}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;