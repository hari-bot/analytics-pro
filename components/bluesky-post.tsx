import React from "react"

interface BlueskyPostProps {
  post: {
    record: {
      text: string
      createdAt: string
    }
    author: {
      avatar: string
      displayName: string
      handle: string
    }
    embed?: {
      images?: Array<{
        fullsize: string
      }>
    }
    replyCount: number
    repostCount: number
    likeCount: number
    quoteCount: number
  }
}

const BlueskyPost = ({ post }: BlueskyPostProps) => {
  const postText = post?.record?.text || "No content"
  const postDate = new Date(post?.record?.createdAt).toLocaleString()
  const postImage = post?.embed?.images?.[0]?.fullsize ?? null

  return (
    <li className="p-4 border rounded-md bg-white shadow-sm">
      <div className="flex items-center space-x-3">
        <img
          src={post.author.avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <h4 className="text-md font-semibold">{post.author.displayName}</h4>
          <p className="text-gray-500 text-sm">@{post.author.handle}</p>
        </div>
      </div>

      <p className="mt-2 text-gray-900">{postText}</p>

        {postImage && (   
        <div className="mt-3">
          <img
            src={postImage}
            alt="Feed Post"
            className="rounded-md w-full h-auto"
          />
        </div>
      )}

      <p className="text-gray-500 text-xs mt-2">{postDate}</p>

      <div className="mt-3 flex justify-between text-gray-700 text-sm">
        <p>💬 {post.replyCount}</p>
        <p>🔁 {post.repostCount}</p>
        <p>❤️ {post.likeCount}</p>
        <p>❝❞ {post.quoteCount}</p>
      </div>
    </li>
  )
}

export default BlueskyPost