# [Sopplayer](https://github.com/SH20RAJ/Sopplayer/) Integration - HTML5 Stylish Video Player

> See All SopProducts: [https://sh20raj.github.io/SopProducts/](https://sh20raj.github.io/SopProducts/)

> Sopplayer Players: [https://sh20raj.github.io/Sopplayer/players/](https://sh20raj.github.io/Sopplayer/players/)

![Sopplayer Screenshot](https://1.bp.blogspot.com/-MXdsGGbh59A/X-cM2B2eQ6I/AAAAAAAAAZU/KLEP-6BI85gMXR-7NjBWIdxnCKyIaNzbACLcBGAsYHQ/w640-h361/sopplayer.JPG)

**See Video Documentation**: [https://youtu.be/Tmj2QOXE6EU](https://youtu.be/Tmj2QOXE6EU)

## Table of Contents
- [Steps](#steps)
- [Before Sopplayer](#before-sopplayer)
- [After Sopplayer](#after-sopplayer)
- [Full HTML Code Example](#full-html-code-example)
- [Additional Information](#additional-information)

## Steps

1. Use the `class="sopplayer"` in your `<video>` tag.
2. Add `data-setup="{}"` attribute to your `<video>` tag.

```html
<video id="my-video" class="sopplayer" controls preload="auto" data-setup="{}" width="500px">
  <!-- Use class="sopplayer" and data-setup="{}" -->
  <source src="sample.mp4" type="video/mp4" />
</video>
```

3. Add the CSS CDN before the closing `</head>` tag.

```html
<link href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css" rel="stylesheet" />
<!-- Here is the CSS Library -->
```

4. Add the JavaScript CDN before the closing `</body>` tag.

```html
<script src="https://rebrand.ly/SopPlayerJS"></script>
<!-- Here is the JavaScript Library -->
```

Here you have completed your Sopplayer Integration.

## Before Sopplayer

![Before Sopplayer](https://1.bp.blogspot.com/-pPXCh0HvCP4/X-cPV_H9i5I/AAAAAAAAAZg/dW7vPwvafR44FdtYowtEaT66Vz8ZfaPnACLcBGAsYHQ/w400-h228/before.JPG)

## After Sopplayer

![After Sopplayer](https://1.bp.blogspot.com/-5VKxy1NHI4s/X-cPXCnksqI/AAAAAAAAAZk/xh-pu7yVskklt1a5FB6yzEPUU_sOXDrfACPcBGAYYCw/w400-h225/after.JPG)

## Full HTML Code Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css" rel="stylesheet" />
  <!-- Here is the CSS Library -->
</head>
<body>
  <center>
    <video id="my-video" class="sopplayer" controls preload="auto" data-setup="{}" width="500px">
      <!-- Use class="sopplayer" and data-setup="{}" -->
      <source src="sample.mp4" type="video/mp4" />
    </video>
  </center>
  <script src="https://rebrand.ly/SopPlayerJS"></script>
  <!-- Here is the JavaScript Library -->
</body>
</html>
```

## Additional Information

See how the full HTML will look like:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/sopplayer.min.css" rel="stylesheet" />
  <!-- Here is the CSS Library -->
</head>
<body>
  <center>
    <video id="my-video" class="sopplayer" controls preload="auto" data-setup="{}" width="500px">
      <!-- Use class="sopplayer" and data-setup="{}" -->
      <source src="sample.mp4" type="video/mp4" />
    </video>
  </center>
  <script src="https://rebrand.ly/SopPlayerJS"></script>
  <!-- Here is the JavaScript Library -->
</body>
</html>
```
