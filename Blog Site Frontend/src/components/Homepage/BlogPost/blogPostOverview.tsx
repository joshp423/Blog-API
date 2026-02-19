import type { blogPost } from "../../../types/blogPosts"

type BlogPostOverviewProps = {
    post: blogPost;
}

function BlogPostOverview({ post }: BlogPostOverviewProps) {
    return(
        <div>
            <h1>{post.title}</h1>
        </div>
    )
}

export default BlogPostOverview