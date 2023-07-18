/**
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

.ima-ad-container {
  top: 0em;
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
}

/* Move overlay if user fast-clicks play button. */
.video-js.vjs-playing .bumpable-ima-ad-container {
  margin-top: -4em;
}

/* Move overlay when controls are active. */
.video-js.vjs-user-inactive.vjs-playing .bumpable-ima-ad-container {
  margin-top: 0em;
}

.video-js.vjs-paused .bumpable-ima-ad-container,
.video-js.vjs-playing:hover .bumpable-ima-ad-container,
.video-js.vjs-user-active.vjs-playing .bumpable-ima-ad-container {
  margin-top: -4em;
}

.ima-controls-div {
  bottom: 0em;
  height: 1.4em;
  position: absolute;
  overflow: hidden;
  display: none;
  opacity: 1;
  background-color: rgba(7, 20, 30, .7);
  background: -moz-linear-gradient(
      bottom,
      rgba(7, 20, 30, .7) 0%,
      rgba(7, 20, 30, 0) 100%); /* FF3.6+ */
  background: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0%,rgba(7, 20, 30, .7)),
      color-stop(100%,rgba(7, 20, 30, 0))); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
      bottom,
      rgba(7, 20, 30, .7) 0%,
      rgba(7, 20, 30, 0) 100%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(bottom,
    rgba(7, 20, 30, .7) 0%,
    rgba(7, 20, 30, 0) 100%); /* Opera 11.10+ */
  background: -ms-linear-gradient(bottom,
    rgba(7, 20, 30, .7) 0%,
    rgba(7, 20, 30, 0) 100%); /* IE10+ */
  background: linear-gradient(to top,
    rgba(7, 20, 30, .7) 0%,
    rgba(7, 20, 30, 0) 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(
    startColorstr='#0007141E',
    endColorstr='#07141E',GradientType=0 ); /* IE6-9 */
}

.ima-controls-div.ima-controls-div-showing {
  height: 3.7em;
}

.ima-countdown-div {
  height: 1em;
  color: #FFFFFF;
  text-shadow: 0 0 0.2em #000;
  cursor: default;
}

.ima-seek-bar-div {
  top: 1.2em;
  height: 0.3em;
  position: absolute;
  background: rgba(255, 255, 255, .4);
}

.ima-progress-div {
  width: 0em;
  height: 0.3em;
  background-color: #ECC546;
}

.ima-play-pause-div, .ima-mute-div, .ima-slider-div, .ima-fullscreen-div {
  width: 2.33em;
  height: 1.33em;
  top: 0.733em;
  left: 0em;
  position: absolute;
  color: #CCCCCC;
  font-size: 1.5em;
  line-height: 2;
  text-align: center;
  font-family: VideoJS;
  cursor: pointer;
}

.ima-mute-div {
  left: auto;
  right: 5.667em;
}

.ima-slider-div {
  left: auto;
  right: 2.33em;
  width: 3.33em;
  height: 0.667em;
  top: 1.33em;
  background-color: #555555;
}

.ima-slider-level-div {
  width: 100%;
  height: 0.667em;
  background-color: #ECC546;
}

.ima-fullscreen-div {
  left: auto;
  right: 0em;
}

.ima-playing:before {
  content: "\00f103";
}

.ima-paused:before {
  content: "\00f101";
}

.ima-playing:hover:before, .ima-paused:hover:before {
  text-shadow: 0 0 1em #fff;
}

.ima-non-muted:before {
  content: "\00f107";
}

.ima-muted:before {
  content: "\00f104";
}

.ima-non-muted:hover:before, .ima-muted:hover:before {
  text-shadow: 0 0 1em #fff;
}

.ima-non-fullscreen:before {
  content: "\00f108";
}

.ima-fullscreen:before {
  content: "\00f109";
}

.ima-non-fullscreen:hover:before, .ima-fullscreen:hover:before {
  text-shadow: 0 0 1em #fff;
}
