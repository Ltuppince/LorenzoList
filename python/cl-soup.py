from bs4 import BeautifulSoup
import urllib.request
import pandas as pd

categoryList = [
    {"title": "household.csv", "url": "https://richmond.craigslist.org/search/hsa?search_distance=2&postal=23220"},
    {"title": "musicinst.csv", "url": "https://richmond.craigslist.org/search/msa?search_distance=2&postal=23220"},
    {"title": "furnature.csv", "url": "https://richmond.craigslist.org/search/fua?search_distance=2&postal=23220"},
    {"title": "electronics.csv", "url": "https://richmond.craigslist.org/search/ela?search_distance=2&postal=23220"},
    {"title": "sporting.csv", "url": "https://richmond.craigslist.org/search/sga?search_distance=2&postal=23220"},
    {"title": "autos.csv", "url": "https://richmond.craigslist.org/search/cta?search_distance=2&postal=23220"},
    {"title": "misc.csv", "url": "https://richmond.craigslist.org/search/foa?search_distance=2&postal=23220"},
    {"title": "collectibles.csv", "url": "https://richmond.craigslist.org/search/cba?search_distance=2&postal=23220"},
]

for d in categoryList:
    fp = urllib.request.urlopen(d["url"])
    mybytes = fp.read()

    html = mybytes.decode("utf8")
    fp.close()

    soup = BeautifulSoup(html)
    links = []
    for link in soup.find_all('a'):
        if("https://richmond.craigslist.org" in link.get('href')):
            links.append(link.get('href'))
    links = list(dict.fromkeys(links)) #remove duplicates
    for i in range(0, 10):
        print(links[i])

    titleArray = []
    priceArray = []
    imgArray = []
    postArray = []
    conditionArray = []

    if(len(links) < 100):
        max = len(links)
    else:
        max = 100

    for i in range(0, max):
        fp = urllib.request.urlopen(links[i])
        mybytes = fp.read()
        html = mybytes.decode("utf8")
        fp.close()
        soup = BeautifulSoup(html, features="html.parser")
        buff = soup.find(id="titletextonly")
        if(buff):
            title = buff.get_text()
        else:
            continue
        buff = soup.find(attrs={"class":"price"})
        if(buff):
            price = buff.get_text().replace("$", "")
        else:
            price = None
        buff = soup.find(attrs={"class":"slide first visible"})
        if(buff):
            img = buff.img['src']
        else:
            continue
        buff = soup.find(id="postingbody").get_text()
        post = buff.replace("QR Code Link to This Post", "").strip()
        buff = soup.find(attrs={"class":"attrgroup"})
        if(buff):
            condition = buff.span.get_text().replace("condition: ", "")
        else:
            condition = None
        titleArray.append(title)
        priceArray.append(price)
        imgArray.append(img)
        postArray.append(post)
        conditionArray.append(condition) 

    data = {"title": titleArray,
            "price": priceArray,
            "img": imgArray,
            "post": postArray,
            "condition": conditionArray}
    df = pd.DataFrame(data)
    df.to_csv("csv/" + d["title"]) 