import "./scss/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const imagesContainerEl = document.querySelector(".slider__images-container");
  const img1El = document.querySelector(".slider__image-container--first  img");
  const img2El = document.querySelector(".slider__image-container--second img");
  const dividerEl = document.querySelector(".slider__divider");
  const handleEl = document.querySelector(".slider__handle");
  const img1ContainerEl = document.querySelector(
    ".slider__image-container--first"
  );
  const img2ContainerEl = document.querySelector(
    ".slider__image-container--second"
  );
  let dragging = false;
  let imagesContainerLeftOffset;
  let imagesContainerWidth;

  const getOffset = clientX => {
    const offset = clientX - imagesContainerLeftOffset;
    if (offset < 0) {
      return 0;
    } else if (offset > imagesContainerWidth) {
      return imagesContainerWidth;
    } else return offset;
  };
  const move = clientX => {
    const offset = getOffset(clientX);
    const percent = (offset / imagesContainerWidth) * 100;
    dividerEl.style.left = `${percent}%`;
    img2ContainerEl.style.width = `${percent}%`;
  };

  const initEvents = () => {
    handleEl.addEventListener("mousedown", () => (dragging = true));
    window.addEventListener("mouseup", () => (dragging = false));
    window.addEventListener("mousemove", e => {
      if (dragging) move(e.clientX);
    });
    handleEl.addEventListener("touchstart", () => (dragging = true));
    handleEl.addEventListener("touchend", () => (dragging = false));
    window.addEventListener("touchmove", e => {
      if (dragging) move(e.touches[0].clientX);
    });
  };

  const adjustImagesSize = () => {
    imagesContainerLeftOffset = imagesContainerEl.offsetLeft;
    imagesContainerWidth = imagesContainerEl.offsetWidth;
    img1El.style.width = imagesContainerWidth + "px";
    img2El.style.width = imagesContainerWidth + "px";
  };

  window.addEventListener("resize", adjustImagesSize);
  adjustImagesSize();
  initEvents();
});
