// ---------- hero line (static text, static-jitter handles the motion) ----------
const HERO_LINE = "hello, i'm austin chadwick and i tell stories through video.";

const typeLine = document.getElementById('type-line');
const echo1 = document.getElementById('echo-line-1');
const echo2 = document.getElementById('echo-line-2');

typeLine.textContent = HERO_LINE;
echo1.textContent = HERO_LINE;
echo2.textContent = HERO_LINE;

requestAnimationFrame(() => {
  setTimeout(() => echo1.classList.add('show'), 150);
  setTimeout(() => echo2.classList.add('show'), 400);
});

// ---------- YouTube embeds: real thumbnail up front, click to play ----------
// shared by the main reel player and the work gallery tiles
function setupYoutubeEmbed(container, videoId, title) {
  if (videoId && !videoId.startsWith('VIDEO_ID')) {
    const img = document.createElement('img');
    img.className = 'yt-thumb-img';
    img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    img.alt = title;
    container.prepend(img);
  }

  container.addEventListener('click', () => {
    if (!videoId || videoId.startsWith('VIDEO_ID')) {
      alert(`Add ${title}'s real YouTube video ID to its data-youtube attribute in index.html.`);
      return;
    }
    // autoplay is fine here — the real thumbnail already served as the
    // "paused" state, so clicking play should actually start playback
    container.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&vq=hd1080"
      title="${title}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;
  });
}

document.querySelectorAll('.work-item[data-youtube]').forEach((item) => {
  const thumb = item.querySelector('.work-thumb');
  setupYoutubeEmbed(thumb, item.dataset.youtube, item.querySelector('.work-title').textContent);
});

// main reel: autoplay immediately (muted — browsers block sound on
// autoplay) instead of showing YouTube's auto-picked thumbnail frame.
// TODO: once Austin sets a real custom thumbnail on the video, switch
// this back to setupYoutubeEmbed() for click-to-play-with-sound.
const playerFrame = document.querySelector('.player-frame[data-youtube]');
if (playerFrame) {
  const videoId = playerFrame.dataset.youtube;
  if (videoId && !videoId.startsWith('VIDEO_ID')) {
    playerFrame.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&vq=hd1080"
      title="Demo Reel"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;
  }
}
