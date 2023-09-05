const CLASS_ANIMATION = 'animation-element';
const CLASS_SHOW = 'show-element';

const animationElements = document.querySelectorAll(`.${CLASS_ANIMATION}`);

const observer = new IntersectionObserver(onEntry, {threshold: [0.0]});

for (const animationElement of animationElements) {
  observer.observe(animationElement);
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(CLASS_SHOW);
    }
  });
}
