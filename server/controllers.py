import urllib
from pyquery import PyQuery as pq
import requests

def search(query, num=20):
  url = 'http://www.google.com/search?q=' + urllib.parse.quote(query) + '&num=' + str(num)
  resp = requests.get(url, timeout=10)

  d = pq(resp.text)

  item_eles = d.items('#main > div > div')
  items = []
  for item_ele in item_eles:
    # divs = item_eles.find(':scope > div')
    item_divs = item_ele.children('div')
    if len(item_divs) != 3:
      continue

    anchor = item_divs.eq(0).children('a')
    if not anchor:
      continue

    anchor_divs = anchor.children('div')
    if len(anchor_divs) != 2:
      continue

    # for i in item_divs.eq(2).items('div:only-child'):
    #   print(i)
    href = anchor.attr.href
    url = urllib.parse.parse_qs(href.replace('/url?', ''))['q'][0] if href.startswith('/url?') else href

    item = {
      'title': anchor_divs.eq(0).text(),
      'subtitle': anchor_divs.eq(1).text(),
      'url': url,
      'desc': item_divs.eq(2).text().replace('\xa0', ' ')
    }

    items.append(item)

  # print(item)
  # random.shuffle(items)

  return items
