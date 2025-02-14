interface VideoStats {
  id: string;
  title: string;
  cover_image_url: string;
  share_url: string;
  video_description: string;
  create_time: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  embed_html: string;
  embed_link: string;
  duration: number;  // Added for video length
}

const TikTokVideoCard = ({ video }: { video: VideoStats }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate engagement rate
  const calculateEngagementRate = () => {
    const totalEngagements = video.like_count + video.comment_count + video.share_count;
    const engagementRate = (totalEngagements / video.view_count) * 100;
    return isNaN(engagementRate) ? 0 : engagementRate.toFixed(2);
  };

  return (
    <a 
      href={video.share_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img 
          src={video.cover_image_url} 
          alt={video.title}
          className="w-full h-40 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          {formatDuration(video.duration)}
        </span>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm mb-1 line-clamp-1">{video.title || video.video_description}</h3>
        <p className="text-xs text-gray-500 mb-3">
          {new Date(video.create_time).toLocaleDateString()}
        </p>
        
        {/* Primary Metrics */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs mb-3">
          <div>
            <p className="font-semibold">{formatNumber(video.view_count)}</p>
            <p className="text-gray-500">Views</p>
          </div>
          <div>
            <p className="font-semibold">{formatNumber(video.like_count)}</p>
            <p className="text-gray-500">Likes</p>
          </div>
          <div>
            <p className="font-semibold">{formatNumber(video.comment_count)}</p>
            <p className="text-gray-500">Comments</p>
          </div>
          <div>
            <p className="font-semibold">{formatNumber(video.share_count)}</p>
            <p className="text-gray-500">Shares</p>
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className="border-t pt-2 grid grid-cols-2 gap-2 text-xs">
          <div className="text-center">
            <p className="text-gray-500">Engagement Rate</p>
            <p className="font-semibold text-blue-600">{calculateEngagementRate()}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Like Ratio</p>
            <p className="font-semibold text-green-600">
              {((video.like_count / video.view_count) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default TikTokVideoCard;