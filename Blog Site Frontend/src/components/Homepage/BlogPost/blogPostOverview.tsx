import type { blogPost } from "../../../types/blogPosts"

type BlogPostOverviewProps = {
    post: blogPost;
}

function BlogPostOverview({ post }: BlogPostOverviewProps) {
    return(
        <h1>{post.title}</h1>
    )
}

export default BlogPostOverview