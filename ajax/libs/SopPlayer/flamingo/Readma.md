# SP-FLAMINGO SopPlayer Skin Integration
  
Documentation Video :- [https://www.youtube.com/watch?v=DOxtPWfKWUY](https://www.youtube.com/watch?v=DOxtPWfKWUY)

Demo Website :- https://sopplayer.sh20raj.repl.co/flamingo

View on Repl.it :- https://replit.com/@SH20RAJ/SopPlayer#flamingo
<center>

[GitHub](https://github.com/SH20RAJ/Sopplayer/tree/main/flamingo)

<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mu0stgqfkzq1j2kc5qvb.png"/>
</center>
### Steps to Import :- 

Steps :- 
 1 . Use `class="sopplayer"` in Your `<video>` Tag .
 2 . And Add `data-setup="{}"`, attribute like this .

---
**HERE IS THE FULL VIDEO CODE**
```
    <video id="my-video" poster="https://i.ytimg.com/vi/YE7VzlLtp-4/maxresdefault.jpg"  
        class="sopplayer" controls preload="auto" data-setup="{}" width="500px">
      <!--Use class="sopplayer" and data-setup="{}" -->
      <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4" type="video/mp4" />
    </video>
```

 3 . Add the JavaScript CDN only before `</body>` Tag

---
**HERE IS THE JAVASCRIPT CDN**
```
<script src="https://cdn.jsdelivr.net/gh/SH20RAJ/Sopplayer/flamingo/sp-flamingo.min.js"></script>
<!--Here is the JavaScript Library-->
```

Here you have completed your Sopplayer-Flamingo Intgretion. 
<center>
**Before Sopplayer**

<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7zrk1s7wleea2v78vdd0.JPG" width="100%"/>

**After Sopplayer**


<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2488umn4p1gvxeh2v35b.PNG"/>


</center>

---
**SEE HOW FULL HTML WILL LOOK LIKE**

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<center>
  <body>
    <video id="my-video" class="sopplayer" controls preload="auto" data-setup="{}" width="500px">
      <!--Use class="sopplayer" and data-setup="{}" -->
      <source src="sample.mp4" type="video/mp4" />
    </video>
    <script src="https://cdn.jsdelivr.net/gh//SH20RAJ/Sopplayer/flamingo/sp-flamingo.min.js"></script>
    <!--Here is the JavaScript Library-->
</center>
</body>

</html>
```

<center>
Visit [GitHub](https://github.com/SH20RAJ/Sopplayer/tree/main/flamingo) 
 View [Demo](https://sopplayer.sh20raj.repl.co/flamingo/)

See Articles :- 

---

https://codexdindia.blogspot.com/2021/02/sp-flamingo-sopplayer-skin-integration.html

---

https://dev.to/sh20raj/sp-flamingo-sopplayer-skin-integration-custom-video-player-4675/
</center>
