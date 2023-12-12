const express = require("express");

const { Blog } = require("./models/blogSchema");
const { Comment } = require("./models/commentSchema");
const { User } = require("./models/userSchema");
const { dbConnection } = require("./db/dbConnection");
const dotenv = require("dotenv")
const app = express();
dotenv.config()
const PORT = 3000;
app.use(express.json());
dbConnection();

// User Registration
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, name, bio, profilepic } = req.body;
    const newUser = new User({
      username,
      email,
      password,
      name,
      bio,
      profilepic,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Create a Blog Post
app.post("/create-post", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const newPost = new Blog({ title, content, author: authorId });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Error creating blog post" });
  }
});

// Add Comment to a Blog Post
app.post("/add-comment", async (req, res) => {
  try {
    const { userId, blogPostId, commentText } = req.body;
    const user = await User.findById(userId);
    const newComment = new Comment({
      user: { userId, username: user.username, name: user.name },
      commentText,
      blog: blogPostId,
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
