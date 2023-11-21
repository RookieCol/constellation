import FeedPosts from "./FeedPosts"
import FeedProfileCard from "./FeedProfileCard"
import FeedSuggested from "./FeedSuggested"

export default function Feed
  (): React.ReactElement {
  return (
    <div className="flex gap-2 p-2 w-full h-full text-zinc-300">
      <FeedProfileCard />
      <FeedPosts />
      <FeedSuggested />
    </div>
  )
}