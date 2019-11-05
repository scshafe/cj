


getPosts = "SELECT * FROM posts p, post_access pa WHERE p.post_id=pa.post_id AND pa.user_id=? ORDER BY post_id DESC LIMIT ? OFFSET ?"
getPost = "SELECT * FROM posts WHERE post_id=?"