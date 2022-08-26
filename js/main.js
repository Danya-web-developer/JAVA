(function () {
  let headerButtons = document.querySelectorAll('.header__link')
  let buttonsTab = document.querySelectorAll('.module__tab')
  let blocksTab = document.querySelectorAll('.module__block')

  headerButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      headerButtons.forEach(btn => {
        btn.classList.remove('header__link--active')
        e.currentTarget.classList.add('header__link--active')
      })
    })
  })

  buttonsTab.forEach(button => {
    button.addEventListener('click', (e) => {
      let path = e.currentTarget.dataset.path

      buttonsTab.forEach(button => {
        button.classList.remove('module__tab--active')
      })
      e.currentTarget.classList.add('module__tab--active')

      blocksTab.forEach(block => {
        block.classList.remove('module__block--active')
        if (block.dataset.target === path) {
          block.classList.add('module__block--active')
        }
      })
    })
  })

  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.header').clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach((each) => {
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
})()