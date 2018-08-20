{% extends "../layout/layout.tpl" %}

{% block content %}
  <div class="item-view view v-transition">
    <!-- item detail -->
    {% include "./item.tpl" %}
    <!-- comments -->
    {% if comments.length > 0 %}
      <div class="comments">
        {% for comment in comments %}
        <li>
          <div class="comhead">
            <a href="javascript: void" class="toggle">[-]</a>
            <a href="/news/user/{{ comment.by }}"></a>
            {{ comment.time | relativeTime }}
          </div>
          <div class="comment-content">
            {{ helper.shtml(comment.text) }}
          </div>
        </li>
        {% endfor %}
      </div>
    {% else %}
      <p>No comments yet. 没comments</p>
    {% endif %}
  </div>
{% endblock %}