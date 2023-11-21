type PostCardProps = {
    postContent: string
    postMedia?: string[]
}

export default function PostBody({ postContent, postMedia }: PostCardProps): React.ReactElement {
    return (
        <div className="m-2">
            {postContent}
            <div>
                {postMedia}
            </div>
        </div>
    )
}