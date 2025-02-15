import React from "react"

interface BlueskyPostProps {
  post: {
    uri: string
    cid: string
    author: {
      did: string
      handle: string
      displayName: string
      avatar: string
    }
    record: {
      text: string
      createdAt: string
      $type: string
      embed?: {
        $type: string
        images?: Array<{
          alt: string
          image: {
            $type: string
            ref: {
              $link: string
            }
            mimeType: string
            size: number
          }
        }>
      }
    }
    embed?: {
      $type: string
      images?: Array<{
        thumb: string
        fullsize: string
        alt: string
        aspectRatio: {
          width: number
          height: number
        }
      }>
    }
    replyCount: number
    repostCount: number
    likeCount: number
    quoteCount: number
    indexedAt: string
  }
}

const BlueskyPost = ({ post }: BlueskyPostProps) => {
  const postText = post.record.text || "No content"
  const postDate = new Date(post.record.createdAt).toLocaleString()
  const postImage = post.embed?.images?.[0]?.fullsize ?? null

  return (
    <li className="p-4 border border-gray-700 rounded-md bg-[#2d3139] shadow-sm">
      <div className="flex items-center space-x-3">
        <img
          src={post.author.avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full border border-gray-700"
        />
        <div>
          <h4 className="text-md font-semibold text-white">{post.author.displayName}</h4>
          <p className="text-gray-400 text-sm">@{post.author.handle}</p>
        </div>
      </div>

      <p className="mt-2 text-gray-200">{postText}</p>

      {postImage && (   
        <div className="mt-3">
          <img
            src={postImage}
            alt="Feed Post"
            className="rounded-md w-full h-auto"
          />
        </div>
      )}

      <p className="text-gray-400 text-xs mt-2">{postDate}</p>

      <div className="mt-3 flex justify-between text-gray-400 text-sm">
        <p>💬 {post.replyCount}</p>
        <p>🔁 {post.repostCount}</p>
        <p>❤️ {post.likeCount}</p>
        <p>❝❞ {post.quoteCount}</p>
      </div>
    </li>
  )
}

export default BlueskyPost