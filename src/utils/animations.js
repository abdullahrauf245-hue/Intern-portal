import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   COMPREHENSIVE ANIMATION HOOKS & UTILITIES
   ═══════════════════════════════════════════════════════════════ */

// ── SCROLL REVEAL OBSERVER ──
// Reveals elements when they scroll into view
export function useScrollReveal(options = {}) {
  const { threshold = 0.08, rootMargin = "0px", once = true } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("revealed");
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = document.querySelectorAll(
      ".reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);
}

// ── STAGGERED REVEAL ──
// Progressively reveals children with staggered delays
export function useStaggerReveal(containerRef, options = {}) {
  const { threshold = 0.1, staggerDelay = 80, selector = "[data-stagger]" } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(selector);
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * staggerDelay}ms`;
              child.classList.add("revealed");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef, threshold, staggerDelay, selector]);
}

// ── ANIMATED COUNTER ──
// Counts up to a target number with easing
export function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return [count, ref];
}

// ── PARALLAX EFFECT ──
// Creates a parallax scroll effect on an element
export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = (rect.top + scrolled) * speed;
      ref.current.style.transform = `translateY(${scrolled * speed - offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return ref;
}

// ── 3D TILT EFFECT ──
// Creates a 3D tilt effect following mouse position
export function useTilt3D(maxTilt = 8) {
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
  }, [maxTilt]);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  }, []);

  return { handleMouseMove, handleMouseLeave };
}

// ── MAGNETIC CURSOR GLOW ──
// Tracks mouse position and sets CSS custom properties for magnetic glow
export function useMagneticGlow() {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return { ref, handleMouseMove };
}

// ── PROGRESS BAR ANIMATION ──
// Animates a progress bar width when visible
export function useProgressAnimation(targetWidth, duration = 1500) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setWidth(eased * targetWidth);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetWidth, duration]);

  return [width, ref];
}

// ── TYPEWRITER EFFECT ──
// Types out text character by character
export function useTypewriter(texts, typingSpeed = 45, deleteSpeed = 20, pauseDuration = 2500) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullText = texts[textIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deleteSpeed, pauseDuration]);

  return displayText;
}

// ── RANDOM FLOAT ANIMATION ──
// Creates randomly fluctuating bar heights (for chart bars)
export function useBarFluctuation(targetHeights, interval = 2000, variance = 4) {
  const [heights, setHeights] = useState(targetHeights.map(() => 0));

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setHeights(targetHeights);
    }, 300);

    const fluctuationInterval = setInterval(() => {
      setHeights((prev) =>
        prev.map((h, i) => {
          const target = targetHeights[i];
          const delta = (Math.random() - 0.5) * variance * 2;
          return Math.max(15, Math.min(100, Math.round(target + delta)));
        })
      );
    }, interval);

    return () => {
      clearTimeout(introTimer);
      clearInterval(fluctuationInterval);
    };
  }, [targetHeights, interval, variance]);

  return heights;
}

// ── SMOOTH NUMBER ANIMATION ──
// Smoothly transitions between two numeric values
export function useSmoothNumber(targetValue, duration = 800) {
  const [value, setValue] = useState(targetValue);
  const prevValue = useRef(targetValue);

  useEffect(() => {
    if (prevValue.current === targetValue) return;

    const startValue = prevValue.current;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(startValue + (targetValue - startValue) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevValue.current = targetValue;
  }, [targetValue, duration]);

  return value;
}

// ── MOUSE TRAIL PARTICLES ──
// Creates a trail of particles following the mouse
export function useMouseTrail(containerRef, particleCount = 6) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const particles = [];
    let mouseX = 0, mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        width: ${4 - i * 0.5}px;
        height: ${4 - i * 0.5}px;
        border-radius: 50%;
        background: rgba(59, 130, 246, ${0.4 - i * 0.06});
        pointer-events: none;
        transition: transform ${0.1 + i * 0.05}s ease;
        z-index: 50;
      `;
      container.appendChild(particle);
      particles.push({ el: particle, x: 0, y: 0 });
    }

    let animFrame;
    const animate = () => {
      particles.forEach((p, i) => {
        const prevX = i === 0 ? mouseX : particles[i - 1].x;
        const prevY = i === 0 ? mouseY : particles[i - 1].y;
        p.x += (prevX - p.x) * 0.3;
        p.y += (prevY - p.y) * 0.3;
        p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
      });
      animFrame = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    animFrame = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
      particles.forEach((p) => p.el.remove());
    };
  }, [containerRef, particleCount]);
}

// ── SPRING PHYSICS ──
// Simple spring physics for value interpolation
export function useSpring(target, stiffness = 170, damping = 26) {
  const [value, setValue] = useState(target);
  const velocity = useRef(0);
  const prevTarget = useRef(target);
  const animFrame = useRef(null);

  useEffect(() => {
    if (prevTarget.current === target) return;

    const step = () => {
      const displacement = target - value;
      const springForce = displacement * (stiffness / 1000);
      const dampingForce = velocity.current * (damping / 1000);
      velocity.current += springForce - dampingForce;
      const newValue = value + velocity.current;

      if (Math.abs(velocity.current) < 0.01 && Math.abs(displacement) < 0.01) {
        setValue(target);
        velocity.current = 0;
        return;
      }

      setValue(newValue);
      animFrame.current = requestAnimationFrame(step);
    };

    animFrame.current = requestAnimationFrame(step);
    prevTarget.current = target;

    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [target, stiffness, damping, value]);

  return value;
}

/* ═══════════════════════════════════════════════════════════════
   FRAMER-MOTION-STYLE VARIANT OBJECTS (for reference/export)
   ═══════════════════════════════════════════════════════════════ */

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export const hoverScaleVariant = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeOut" },
};
