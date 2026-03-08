(() => {
  const initCarousel = () => {
    const banner = document.querySelector(".banner");
    const bannerScroll = document.querySelector(".bannerScroll");
    const list = document.querySelector(".bannerList");

    if (!banner || !bannerScroll || !list) return;

    // Three clones so we have [list][c1][c2][c3]. We only show c1 or c2 (middle),
    // and we have extra content so a wide banner never hits empty space.
    const clone1 = list.cloneNode(true);
    const clone2 = list.cloneNode(true);
    const clone3 = list.cloneNode(true);
    bannerScroll.appendChild(clone1);
    bannerScroll.appendChild(clone2);
    bannerScroll.appendChild(clone3);

    const speed = 1.5;
    let position = 0;
    let paused = false;
    let listWidth = 0;
    let started = false;

    const step = () => {
      if (paused) {
        requestAnimationFrame(step);
        return;
      }

      if (!started) {
        const items = list.children;
        const firstRect = items[0].getBoundingClientRect();
        const lastRect = items[items.length - 1].getBoundingClientRect();
        listWidth = Math.round(lastRect.right - firstRect.left);
        
        console.log(listWidth);

        if (listWidth <= 0) {
          requestAnimationFrame(step);
          return;
        }

        position = 0;
        bannerScroll.style.transform = `translateX(${position}px)`;
        started = true;
        requestAnimationFrame(step);
        return;
      }

      position -= speed;
      console.log("position: " + position);
      console.log("list width: ", listWidth);
      if (position <= -2 * listWidth) {
        console.log("shifting list");
        position += listWidth;
      }
      bannerScroll.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(step);
    };

    banner.addEventListener("mouseenter", () => {
      paused = true;
    });

    banner.addEventListener("mouseleave", () => {
      paused = false;
    });

    requestAnimationFrame(step);
  };

  const initCustomCursor = () => {
    const cursor = document.querySelector(".customCursor");
    const links = document.querySelectorAll("a");
    if (!cursor || links.length === 0) return;

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.classList.add("isOverLink");
        document.body.style.cursor = "none";
        document.documentElement.classList.add("customCursorActive");
      });
      link.addEventListener("mouseleave", () => {
        cursor.classList.remove("isOverLink");
        document.body.style.cursor = "";
        document.documentElement.classList.remove("customCursorActive");
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initCarousel();
      initCustomCursor();
    });
  } else {
    initCarousel();
    initCustomCursor();
  }
})();
