export default function Feed
(): React.ReactElement {
    return (
        <div className="grid grid-cols-4 gap-2 p-2 w-full h-ful">
        <div className="col-span-1 bg-gray-200 dark:bg-gray-800 p-2 rounded-lg">
          <div className="space-y-2">
            <img
              alt="Profile Picture"
              className="rounded-full mx-auto"
              height="50"
              src="/placeholder.svg"
              style={{
                aspectRatio: "50/50",
                objectFit: "cover",
              }}
              width="50"
            />
            <h2 className="text-xl font-bold text-center">User Name</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
              Bio: This is a user bio, it's a short description about the user.
            </p>
            <div className="text-center">
              <p className="font-bold text-sm">
                50 <span className="font-normal">Posts</span>
              </p>
              <p className="font-bold text-sm">
                200 <span className="font-normal">Followers</span>
              </p>
              <p className="font-bold text-sm">
                300 <span className="font-normal">Following</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-gray-200 dark:bg-gray-800 p-2 rounded-lg overflow-auto">
          <div className="space-y-2">
            <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
              <h2 className="text-xl font-bold">Posts</h2>
              <textarea className="w-full p-2 rounded-lg" placeholder="What's on your mind?" />
              {/* <Button className="mt-2" type="submit" variant="default">
                Post
              </Button> */}
            </div>
            <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
              <h2 className="text-xl font-bold">Post 1</h2>
              <p className="text-sm">This is the content of post 1.</p>
            </div>
            <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
              <h2 className="text-xl font-bold">Post 2</h2>
              <p className="text-sm">This is the content of post 2.</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-gray-200 dark:bg-gray-800 p-2 rounded-lg overflow-auto">
          <div className="space-y-2">
            <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
              <h2 className="text-xl font-bold">Additional Info</h2>
              <p className="text-sm">This is some additional information.</p>
            </div>
          </div>
        </div>
      </div>
    )
}