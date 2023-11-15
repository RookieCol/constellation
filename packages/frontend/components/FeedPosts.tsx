import ShareAPost from "./ShareAPost"

export default function FeedPosts(): React.ReactElement {
    return (
        <div className="md:w-1/2 h-[200vh] bg-gray-900 p-2 rounded-lg overflow-auto">
            <div className="space-y-2">
                <ShareAPost />
                <div className="p-2 bg-gray-800 rounded-lg">
                    <h2 className="text-xl font-bold">Post 1</h2>
                    <p className="text-sm">This is the content of post 1.</p>
                </div>
                <div className="p-2 bg-gray-800 rounded-lg">
                    <h2 className="text-xl font-bold">Post 2</h2>
                    <p className="text-sm">This is the content of post 2.</p>
                </div>
            </div>
        </div>
    )
}