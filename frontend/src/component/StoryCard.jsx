import { useAuth } from '../context/AuthContext';

const StoryCard = ({ story, onBookmarkToggle, isLoggedIn }) => {
  const { user } = useAuth();

  const isBookmarked = user
    ? story.bookmarkedBy.map((id) => id.toString()).includes(user.id.toString())
    : false;

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition">

      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-semibold text-gray-900 hover:text-orange-500 transition leading-snug"
      >
        {story.title}
      </a>

      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
        <span className="text-orange-500 font-medium">
          ▲ {story.points} points
        </span>
        <span>by {story.author}</span>
        <span>{formatDate(story.postedAt)}</span>
      </div>

      {isLoggedIn && (
        <button
          onClick={() => onBookmarkToggle(story._id)}
          className={`mt-3 text-sm px-3 py-1.5 rounded-md font-medium transition border ${
            isBookmarked
              ? 'bg-orange-50 border-orange-400 text-orange-500 hover:bg-orange-100'
              : 'bg-gray-50 border-gray-300 text-gray-500 hover:bg-gray-100'
          }`}
        >
          {isBookmarked ? '🔖 Bookmarked' : '🔖 Bookmark'}
        </button>
      )}

    </div>
  );
};

export default StoryCard;