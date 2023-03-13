const ResponsiveVideoBackgroundTemplate = document.createElement('template');
ResponsiveVideoBackgroundTemplate.innerHTML = `
  <style>
    :host {
      display: inline-block;
      box-sizing: border-box;
    }
    :host * {
      box-sizing: inherit;
    }

    :host {
      position: relative;
      overflow: hidden;
    }

    :host .background,
    :host .overlay {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }

    :host .background {
      object-position: center center;
      object-fit: cover;
    }

    :host .overlay {
      background-color: var(--overlay-color, transparent);
    }

    /* Fix for Safari that puts inline videos on top by default */
    :host .background { z-index: 48; }
    :host .overlay { z-index: 49; }
    :host .content { position: relative; z-index: 50; }
  </style>
  <div class="overlay"></div>
  <div class="content">
    <slot>You need to put some content here</slot>
  </div>
`;

export class ResponsiveVideoBackground extends HTMLElement {
  constructor() {
    super();

    // Initialize Shadow DOM
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(ResponsiveVideoBackgroundTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    // Get attributes values
    const webm = this.getAttribute('webm');
    const mp4 = this.getAttribute('mp4');
    const poster = this.getAttribute('poster');
    const fallback = this.getAttribute('fallback');
    const srcset = this.getAttribute('srcset');
    const sizes = this.getAttribute('sizes');
    const breakpoint = this.getAttribute('breakpoint');

    const overlayElement = this.shadowRoot.querySelector('.overlay');

    let videoIsLoaded = false;
    let videoElement;

    if (
      window.matchMedia('(prefers-reduced-motion: no-preference)') &&
      (webm || mp4) &&
      (breakpoint === null || window.matchMedia(`(min-width: ${breakpoint})`).matches)
    ) {
      const addVideo = options => {
        // there's a video and the viewport is at least`breakpoint` pixels wide, let's show the video
        videoElement = document.createElement('video');
        videoElement.classList.add('background');

        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('no-controls', '');
        videoElement.muted = true;
        videoElement.setAttribute('loop', '');

        if ('autoplay' in options && options.autoplay) {
          videoElement.setAttribute('autoplay', '');
          videoElement.setAttribute('preload', 'auto');
        } else {
          videoElement.setAttribute('preload', 'none');
        }

        // Uncomment this if CORS is required and video server sends Access-Control-Allow-Origin header
        // videoElement.setAttribute("crossorigin", "anonymous");

        if (poster) {
          videoElement.setAttribute('poster', poster);
        }
        if (webm) {
          const webmSource = document.createElement('source');
          webmSource.setAttribute('src', webm);
          webmSource.setAttribute('type', 'video/webm');
          videoElement.appendChild(webmSource);
        }
        if (mp4) {
          const mp4Source = document.createElement('source');
          mp4Source.setAttribute('src', mp4);
          mp4Source.setAttribute('type', 'video/mp4');
          videoElement.appendChild(mp4Source);
        }

        // Insert the video element in the DOM before the overlay
        this.shadowRoot.insertBefore(videoElement, overlayElement);

        videoIsLoaded = true;
      };

      // Handle user preference for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)');
      const prefersReducedMotionNoPreference = window.matchMedia(
        '(prefers-reduced-motion: no-preference)',
      );

      const handleReducedMotionChanged = () => {
        if (prefersReducedMotionNoPreference.matches) {
          if (videoIsLoaded) {
            videoElement.play();
          } else {
            // Video is added to the page in autoplay because the user didn't prefer reduced motion
            addVideo({ autoplay: true });
          }
        } else if (videoIsLoaded) {
          videoElement.pause();
        } else {
          // Video is added to the page but without autoplay because the user prefers reduced motion
          addVideo({ autoplay: false });
        }
      };

      // trigger this once on load to set up the initial value
      handleReducedMotionChanged();

      prefersReducedMotion.addEventListener('change', handleReducedMotionChanged);
    } else if (srcset) {
      // the viewport is less than `breakpoint` pixels wide, or there is no video, and there is an image

      const imageElement = document.createElement('img');
      imageElement.classList.add('background');
      if (fallback) {
        imageElement.setAttribute('src', fallback);
      }
      imageElement.setAttribute('srcset', srcset);
      if (sizes) {
        imageElement.setAttribute('sizes', sizes);
      }

      // Insert the image element in the DOM before the overlay
      this.shadowRoot.insertBefore(imageElement, overlayElement);
    }
  }
}

window.ResponsiveVideoBackground = ResponsiveVideoBackground;

if (
  typeof window !== 'undefined' &&
  'customElements' in window &&
  window.customElements.get('responsive-video-background') === undefined
) {
  window.customElements.define('responsive-video-background', ResponsiveVideoBackground);
}
