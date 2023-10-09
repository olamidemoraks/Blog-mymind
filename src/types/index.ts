interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: Date;
  createdAt: Date;
  likes: string[];
  comments: Comment[];
  author: Author;
  photo: { url: string };
}

interface Author {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Comment {
  _id: string;
  comment: string;
  user: Author;
  createdAt: Date;
  updatedAt: Date;
}
