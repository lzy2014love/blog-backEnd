<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimal-ui" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <link rel="stylesheet" href="/public/css/news.css" />
  <link rel="shortcut icon" href="/public/favicon.png" type="image/x-icon" />
  <title>{% block title %}egg - HackerNews{% endblock %}</title>
</head>

<body>
  <div id="wapper">
    <div id="header">
      <a id="yc" href="http://www.ycombinator.com">
        <img src="https://news.ycombinator.com/y18.gif">
      </a>
      <h1>
        <a href="/news">Hacker News</a>
      </h1>
      <span class="source">
        Built with
        <a href="https://eggjs.org/" target="_blank">Egg</a> |
        <a href="https://github.com/eggjs/examples/tree/master/hackernews-async-ts" target="_blank">Source</a>
      </span>
    </div>
    {% block content %}{% endblock %}
  </div>
</body>

</html>