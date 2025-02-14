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
}

const TikTokVideoCard = ({ video }: { video: VideoStats }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
  };

  return (
    <a 
      href={video.share_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img 
        src={video.cover_image_url} 
        alt={video.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-sm mb-1 line-clamp-1">{video.title || video.video_description}</h3>
        <p className="text-xs text-gray-500 mb-2">
          {new Date(video.create_time).toLocaleDateString()}
        </p>
        
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
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
      </div>
    </a>
  );
};

export default TikTokVideoCard; 