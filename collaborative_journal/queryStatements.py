#prepared query statements
from collaborative_journal import model
import sys

queries = {
    "getPosts" : "SELECT * FROM posts p, post_access pa WHERE p.post_id=pa.post_id AND pa.user_id=? ORDER BY post_id DESC LIMIT ? OFFSET ?",
    "getPost" : "SELECT * FROM posts WHERE post_id=?"

}



def getQuery(type, parameters):

    connection = model.get_db()
    # print(parameters, file=sys.stderr)
    # print(queries[type], file=sys.stderr)
    cursor = connection.execute(queries[type], parameters)

    results = cursor.fetchall()
    # print(results, file=sys.stderr)
    cursor.close()

    return results