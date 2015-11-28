# markdown-it-inline-text-color

> Wraps text with a &lt;span&gt; setting color attribute [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

__v1.+ requires `markdown-it` v4.+, see changelog.__

'{color:red}red{color} light {color:yellow}yellow{color} light {color:green} light' => &lt;span style="color:red;"&gt;red&lt;/span&gt; light&lt;span style="color:yellow;"&gt;yellow&lt;/span&gt; light &lt;span style="color:green;"&gt;green&lt;/span&gt; light

Markup is based on Confluence wiki advanced text formatting


## Install

node.js:

```bash
npm install markdown-it-inline-text-color --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-inline-text-color'));

md.render('{color:red}red{color} light {color:yellow}yellow{color} light {color:green} light') => <p><span style="color:red;">red</span> light <span style="color:yellow;">yellow</span> light <span style="color:green;">green</span> light</p>
```

## License

[MIT](https://github.com/markdown-it/markdown-it-inline-text-color/blob/master/LICENSE)
