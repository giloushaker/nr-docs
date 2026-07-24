# Custom Export Templates

The printed and exported output of a roster is driven by a template, and you can
supply your own to control how it looks. Templates are not tied to a specific
game system.

In the builder, press **Y** to open the export popup and edit the template.

A template is an XML file that wraps HTML and CSS, with template tags that query
the roster for the values to fill in. Because it is HTML and CSS underneath, you
can adapt an existing HTML/CSS design into a template by wrapping it in the XML
tags and adding the roster queries.

The community templates repository,
[giloushaker/nr-templates](https://github.com/giloushaker/nr-templates), has
working examples to start from, including
[fancyscribe.xml](https://github.com/giloushaker/nr-templates/blob/main/fancyscribe.xml),
a port of the [FancyScribe](https://nilsueter.github.io/fancyscribe/) layout.
