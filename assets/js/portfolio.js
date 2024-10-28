document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll("video");

  const lazyLoadVideo = (video) => {
    const source = video.querySelector("source");
    if (source && source.dataset.src) {
      source.src = source.dataset.src;
      video.load(); // Load the video once the src is set
    }
  };

  // Lazy load videos when they come into the viewport
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lazyLoadVideo(entry.target); // Load the video when it enters the viewport
          observer.unobserve(entry.target); // Stop observing once loaded
        }
      });
    },
    { threshold: 0.25 }
  );

  videos.forEach((video) => {
    observer.observe(video);
  });
});
