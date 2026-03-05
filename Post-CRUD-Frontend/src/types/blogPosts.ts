interface blogPost {
  id: number;
  timeposted: Date;
  published: boolean;
  text: string;
  title: string;
  author: string;
}

export type { blogPost };
