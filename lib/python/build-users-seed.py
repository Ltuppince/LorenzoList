import pandas as pd

data = pd.read_csv("csv/users.1000.csv") 
print(data.head())

buff = ""

for index, row in data.iterrows():
    s = f"INSERT INTO Users (username, email, passord) VALUES ({row.username}, {row.email}, {row.password});\n"
    buff += s

f = open("../sql/users.seed.sql", "w")
f.write(buff)
f.close()


