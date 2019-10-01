

CREATE TABLE users(
	user_id  NUMBER      NOT NULL PRIMARY KEY,
	username VARCHAR(20) NOT NULL,
	fullname VARCHAR(40) NOT NULL,
	email    VARCHAR(40) NOT NULL,
	password VARCHAR(40) NOT NULL
);

CREATE TABLE friends (
	user1_id NUMBER NOT NULL REFERENCES users,
	user2_id NUMBER NOT NULL REFERENCES users,
	PRIMARY KEY (user1_ID, user2_ID),
	CONSTRAINT dif_friends CHECK (user1_id <> user2_id)
);

-- CREATE TRIGGER order_friends_pairs
-- 	BEFORE INSERT ON friends
-- 	FOR EACH ROW
-- 		DECLARE temp NUMBER;
-- 		BEGIN
-- 			IF :NEW.user1_id > :NEW.user2_id THEN
-- 				temp := :NEW.USER2_ID;
-- 				:NEW.user2_id := :NEW.user1_id;
-- 				:NEW.user1_id := temp;
-- 			END IF ;
-- 		END;
-- /

CREATE TABLE posts (
	post_id NUMBER NOT NULL PRIMARY KEY,
	title VARCHAR(50),
	filename VARCHAR(100) NOT NULL,
	year NUMBER NOT NULL,
	month NUMBER NOT NULL,
	day NUMBER NOT NULL
);

CREATE TABLE post_access (
	user_id NUMBER NOT NULL REFERENCES users,
	post_id NUMBER NOT NULL REFERENCES posts
);
