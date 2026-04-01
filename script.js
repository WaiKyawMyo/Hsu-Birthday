document.addEventListener("DOMContentLoaded", () => {
  const backgroundMusic = document.getElementById("backgroundMusic");
  const startButton = document.getElementById("startButton");
  const envelopeContainer = document.getElementById("envelopeContainer");
  const unfoldButton = document.getElementById("unfoldButton");
  const finalGreetingElement = document.getElementById("finalGreeting");

  const messageGreeting = "Happy 22nd Birthday,";
  const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"]; // Ensure these files exist

  function transitionToStep(targetStepId) {
    document
      .querySelectorAll(".step")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById(targetStepId).classList.add("active");
    window.scrollTo(0, 0);
  }

  // --- Step 1 ---
  startButton.addEventListener("click", () => {
    transitionToStep("step2");
    backgroundMusic.play().catch(() => console.log("Music muted by browser"));
  });

  // --- Step 2 ---
 envelopeContainer.addEventListener("click", () => {
  // 1. Add 'open' class to trigger CSS animations (Flap and Letter Slide)
  envelopeContainer.classList.add("open");
  
  // 2. Hide the click instruction immediately
  const instruction = envelopeContainer.querySelector(".click-instruction");
  if(instruction) instruction.style.opacity = "0";

  // 3. WAIT for the letter to finish sliding up (approx 1.2 seconds)
  // then transition to the full letter view (Step 3)
  setTimeout(() => {
    transitionToStep("step3");
    
    // Add the 'show' class to Step 3 for its own fade-in animation
    setTimeout(() => {
      document.getElementById("letterContainer").classList.add("show");
    }, 100);
    
  }, 1200); // Increased delay to allow her to see the letter slide out
});

  // --- Step 3 ---
  unfoldButton.addEventListener("click", () => {
    transitionToStep("step4");
    startCelebration();
    createDecorations();
  });

  // --- Step 4 Animations ---
  function startCelebration() {
    // 1. Typewriter Effect
    let i = 0;
    finalGreetingElement.textContent = "";
    const typeWriter = setInterval(() => {
      if (i < messageGreeting.length) {
        finalGreetingElement.textContent += messageGreeting.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
        finalGreetingElement.classList.add("typed");
      }
    }, 100);

    // 2. Image Slider
    let currentImg = 0;
    const imgEl = document.getElementById("memoryImage");
    setInterval(() => {
      currentImg = (currentImg + 1) % images.length;
      imgEl.style.opacity = 0;
      setTimeout(() => {
        imgEl.src = images[currentImg];
        imgEl.style.opacity = 1;
      }, 500);
    }, 3000);

    // 3. Effects
    createConfetti();
    createBalloons();
  }
  function startImageLoop() {
    const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
    let current = 0;
    const imageElement = document.getElementById("memoryImage");
    setInterval(() => {
      current = (current + 1) % images.length;
      imageElement.src = images[current];
    }, 2500);
  }
  function createConfetti() {
    const colors = ["#ff85a2", "#f75c7e", "#f4d03f", "#ffffff"];
    for (let i = 0; i < 100; i++) {
      const div = document.createElement("div");
      div.className = "confetti";
      div.style.left = Math.random() * 100 + "vw";
      div.style.top = "-10px";
      div.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      div.style.width = Math.random() * 10 + 5 + "px";
      div.style.height = div.style.width;
      div.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
      document.body.appendChild(div);
      setTimeout(() => div.remove(), 5000);
    }
  }
  function createDecorations() {
    const layer = document.getElementById("decorationLayer");

    // Create 30 random sparkles
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.top = Math.random() * 100 + "vh";
        const size = Math.random() * 5 + 3 + "px";
        sparkle.style.width = size;
        sparkle.style.height = size;
        sparkle.style.animationDelay = Math.random() * 2 + "s";
        layer.appendChild(sparkle);
      }, i * 100);
    }

    // Continuously create floating hearts
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 20 + 10 + "px";
      heart.style.animationDuration = Math.random() * 3 + 4 + "s";
      layer.appendChild(heart);

      // Remove from DOM after animation
      setTimeout(() => heart.remove(), 6000);
    }, 800);
  }
  function createBalloons() {
    const colors = [
      "rgba(255, 133, 162, 0.7)",
      "rgba(244, 208, 63, 0.7)",
      "rgba(247, 92, 126, 0.7)",
    ];
    for (let i = 0; i < 15; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.left = Math.random() * 90 + "vw";
      balloon.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      balloon.style.animation = `rise ${Math.random() * 5 + 5}s ease-in forwards`;
      balloon.style.animationDelay = Math.random() * 5 + "s";
      document.body.appendChild(balloon);
      setTimeout(() => balloon.remove(), 12000);
    }
  }
});
