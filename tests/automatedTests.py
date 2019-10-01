


import collaborative_journaling.queryStatements as qs

def getUserNameFromID():
    query = 'getPosts'
    results = qs.getQuery(query)




def runTests():
    getUserNameFromID()


if __name__ == '__main__':
    runTests()