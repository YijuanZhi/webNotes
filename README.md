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
<img src="images/avatar.jpg" alt="photo of me" height = 100px width = auto/>
```
And the following cotent is the result of the previous code:
<p>This is <strong>strong</strong>!</p>
<p>This is <em>em</em>phasize.</p>
<p>This is <u>underlined</u> text.</p>
<p>
this is a break<br>So that this is the second line.
</p>
<a href="https://github.com/YijuanZhi" target="_blank">Link to my github.</a>
<img src="images/avatar.jpg" alt="photo of me" height = 100px width=auto/>

Result section ends here.
(Markdown file in github seems to fail to fetch the image in another folder though.)

## CSS Section
- For elements in html, class can be used for as many times as we want, but id can only be used once in each html document.
- CSS consists of selectors and their declaration blocks. Here are some instances of selectors for *, *tag, class and id:
```CSS
/*
  * is for the whole webpage including everyhing.
*/
*{
  /* top right bottom left*/
  padding: 5px 0px 5px 0px;
}

/*
body is for the whole body part
*/
body {
  /*background-image: url("images/blur-clean.jpg");*/
  color: black;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}

/*
 for the tags
*/
h3,
p {
  color: darkslateblue;
  font-size: 14px;
  font-family: Helvetica, sans-serif;
  text-align: justify;
}

/*
.main-text is used for a class
#main-text is used for a id(which we usually do not use)
*/
.main-text {
  color: grey;
  text-align: justify;
  text-indent: 40px;
}

#author-text {
  color: mediumseagreen;
  font-size: 10px;
  float: left;
  margin-top: 70px;
}
```
