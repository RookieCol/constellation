export default function FeedSuggested(): React.ReactElement {
    return (
        <div className="w-1/4 bg-gray-900 h-fit p-2 rounded-lg overflow-auto sticky top-3">
            <div className="space-y-2">
                <div className="p-2 bg-gray-800 rounded-lg">
                    <h2 className="text-xl font-bold">Additional Info</h2>
                    <p className="text-sm">This is some additional information.</p>
                </div>
            </div>
        </div>
    )
}