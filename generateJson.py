import mysql.connector
import json

cnx = mysql.connector.connect(user='root', password='PQOWI!)@(Bean0192',
                              host='localhost',
                              database='scoreCreator')
mycursor = cnx.cursor()

# objects
songs = []
songIds = []



# ====================================================================
# find songIds
mycursor.execute("SELECT songId FROM songs;")
for songId in mycursor.fetchall():
    songIds.append(songId[0])

# get songs
for i in songIds:

    # reset objects
    stems = []
    stemIds = []

    mycursor.execute(f"SELECT JSON_OBJECT('songId', songId, 'songName', songName, 'bpm', bpm, 'instruments', instruments) AS 'Songs' FROM songs WHERE songId={i};")
    currSong = mycursor.fetchone()[0]
    currSong = json.loads(currSong)

    # ====================================================================
    # find stemIds
    mycursor.execute(f"SELECT stemId FROM stems WHERE songId={i};")
    for stemId in mycursor.fetchall():
        stemIds.append(stemId[0])

    # get stems
    for j in stemIds:
        # reset objects
        sections = []
        sectionIds = []

        mycursor.execute(f"SELECT JSON_OBJECT('stemId', {j}, 'stemName', stemName) FROM stems WHERE stemId={j};")
        currStem = mycursor.fetchone()[0]
        currStem = json.loads(currStem)

        # ====================================================================
        # find sectionIds
        mycursor.reset()
        mycursor.execute(f"SELECT sectionId FROM sections WHERE stemId={j};")


        for sectionId in mycursor.fetchall():
            sectionIds.append(sectionId[0])

        # get sections
        for k in sectionIds:
            mycursor.execute(f"SELECT JSON_OBJECT('sectionId', sectionId, 'stemId', stemId, 'sectionName', sectionName, 'IPFS_CID', IPFS_CID) FROM sections WHERE sectionId={k};")
            currSection = mycursor.fetchone()[0]
            currSection = json.loads(currSection)
            sections.append(currSection)

        # add data
        currStem["sections"] = sections
        stems.append(currStem)

    # add data
    currSong["stems"] = stems
    songs.append(currSong)

print(songs)
with open('score-creator/data/songData.json', 'w', encoding='utf-8') as f:
    json.dump(songs, f, ensure_ascii=False, indent=4)
cnx.close()
