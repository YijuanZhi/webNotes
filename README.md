# HTML/CSS Web Design Practice Notes
Hi there! This is just a simple note of learning html and css!

## HTML Section
 - `<!-- This is a comment section-->`
 - A html file's basic structure:
```html
<!DOCTYPE HTML>
<html>
<head>
<!--head part is used for title, link, etc.-->
</head>
<body>
<!--body part is used for cotent. -->
</body>
</html>
```
### Head Part
- `<title>some title</title>` is used for the title of the whole webpage.
- `<link rel="stylesheet" type="text/css" href="style.css" />` using link tag to link the style.css file to our index.html file. So that we can use a external css file to style up our html file.

### Body part
- There are 6 levels of headings: `<h1>` to `<h6>`.
- We use divisions to create blocks in our page, the class is used for styling in our css file.
```html
<div class="author-box">
<h1>This is a heading.</h1>
<p>Some post about html/css.</p>
</div>
```
- Some usefull tags
```html
<p>This is <strong>strong</strong>!</p>
<p>This is <em>em</em>phasize.</p>
<p>This is <u>underlined</u> text.</p>
<p>
this is a break<br>So that this is the second line.
</p>
<a href="https://github.com/YijuanZhi" target="_blank">Link to my github.</a>
<img src="avatar.jpg" alt="photo of me" height = 100px width = auto border-radius=50%/>
```
And the following cotent is the result of the previous code.
<p>This is <strong>strong</strong>!</p>
<p>This is <em>em</em>phasize.</p>
<p>This is <u>underlined</u> text.</p>
<p>
this is a break<br>So that this is the second line.
</p>
<a href="https://github.com/YijuanZhi" target="_blank">Link to my github.</a>
<img src="avatar.jpg" alt="photo of me" height = 100px width=auto/>


## CSS Section
