import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../components/StoryCard';

const Bookmarks = () => {
  const [bookmarked, setBookmarked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();

  const fetchBookmarks = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/api/stories?limit=100');
      const filtered = data.data.filter((story) =>
        story.bookmarkedBy
          .map((id) => id.toString())
          .includes(user.id.toString())
      );
      setBookmarked(filtered);
    } catch (err) {
      setError('Failed to load bookmarks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleBookmarkToggle = async (storyId) => {
    try {
      await api.post(`/api/stories/${storyId}/bookmark`);
      await fetchBookmarks();
    } catch (err) {
      console.error('Bookmark toggle failed:', err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">

        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookmarks</h1>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {!loading && !error && bookmarked.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔖</p>
            <p className="text-gray-500 text-sm">
              No bookmarks yet. Go bookmark some stories!
            </p>
          </div>
        )}

        {!loading && !error && bookmarked.length > 0 && (
          <div className="space-y-4">
            {bookmarked.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                onBookmarkToggle={handleBookmarkToggle}
                isLoggedIn={true}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Bookmarks;