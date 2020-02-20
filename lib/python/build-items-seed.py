import pandas as pd
import os
import random

if os.path.exists("../sql/items.seed.sql"):
    os.remove("../sql/items.seed.sql")

categorys = [
    {"id": 1, "filename": "csv/autos.csv"},
    {"id": 2, "filename": "csv/collectibles.csv"},
    {"id": 3, "filename": "csv/electronics.csv"},
    {"id": 4, "filename": "csv/furnature.csv"},
    {"id": 5, "filename": "csv/household.csv"},
    {"id": 6, "filename": "csv/misc.csv"},
    {"id": 7, "filename": "csv/musicinst.csv"},
    {"id": 8, "filename": "csv/sporting.csv"}
]

condition = ["good", "like new", "fair", "great",
             "excellent", "new", "needs love", "seen better days"]

for cat in categorys:
    data = pd.read_csv(cat["filename"])
    print(data.head())
    buff = ""
    for index, row in data.iterrows():
        user_id = random.randint(1, 1001)
        title = row.title.replace('"', '')
        post = row.post.replace('"', '')
        i = random.randint(0, len(condition)-1)
        s = f'INSERT INTO Items (category_id, title, price, img, post, user_id) VALUES ("{cat["id"]}", "{title}", "{row.price}", "{row.img}", "{post}", "{user_id}");\n'
        buff += s
    f = open("../sql/items.seed.sql", "a")
    f.write(buff)
    f.close()
