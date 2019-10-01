# queries



SELECT * FROM posts p, post_access pa WHERE p.post_id=pa.post_id AND user_id=?;