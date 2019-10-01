#prepared query statements
import collaborative_journaling.model

queries = {
    "getPosts" : "SELECT * FROM posts p, post_access pa WHERE p.post_id=pa.post_id AND user_id=? ORDER BY post_id DESC LIMIT ? OFFSET ?"
    "getPost" : "SELECT * FROM posts p, post_access pa WHERE p.post_id=? AND user_id=?"
}



def getQuery(type, parameters):

    connection = model.db()
    cursor = connection.execute(queries[type], parameters)

    results = cursor.fetchall()
    cursor.close()
    return results