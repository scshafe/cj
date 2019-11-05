-- populateDatabase

INSERT INTO users(user_id, username, fullname, email, password)
VALUES (1, 'scshafe', 'Cole Shaffer', 'coleshffr@gmail.com', '123temp'),
       (2, 'dummy',   'dum my'      , 'dummy@gmail.com'    , '123temp');

-- INSERT INTO friends(user1_id, user2_id)
-- VALUES (1, 2);

INSERT INTO posts(post_id, title, filename, year, month, day)
VALUES (1, "firstPost", "postNumberOne", 2019, 7, 24);

INSERT INTO post_access(user_id, post_id)
VALUES (1,1);