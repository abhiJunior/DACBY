import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import StoryCard from '../component/StoryCard';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { token } = useAuth();

  const fetchStories = async (currentPage) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/api/stories?page=${currentPage}&limit=10`);
      setStories(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError('Failed to load stories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories(page);
  }, [page]);

  const handleBookmarkToggle = async (storyId) => {
    try {
      const { data } = await api.post(`/api/stories/${storyId}/bookmark`);
      setStories((prev) =>
        prev.map((s) => (s._id === storyId ? data.data : s))
      );
    } catch (err) {
      console.error('Bookmark toggle failed:', err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Top Stories</h1>
          <span className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </span>
        </div>

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

        {!loading && !error && (
          <div className="space-y-4">
            {stories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                onBookmarkToggle={handleBookmarkToggle}
                isLoggedIn={!!token}
              />
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-600 font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-md font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Stories;