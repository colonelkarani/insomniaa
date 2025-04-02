async function sendMessage() {
    const input = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'inakam tulia....';
    if (!input) {
        responseDiv.innerHTML = 'I havent got what you just said. could you please try again';
        return;
    }
    
    try {
       const response = await fetch("http://localhost:3000/api/chat", { // Use your backend proxy
        method: "POST",
        headers: { "Content-Type": "application/json" },y: JSON.stringify({
"model": "deepseek/deepseek-chat-v3-0324:free",
"messages": [{ "role": "user", "content": input}],
}),
},
);
const data = await response.json();
console.log(data);
const markdownText =  data.choices?.[0]?.message?.content  || 'No response received:(';
responseDiv.innerHTML = marked.parse(markdownText);
    } catch (error) {
        responseDiv.innerHTML = 'I have a headache try again, maybe it will cool down...';
    }
}
const url = "https://meme-api.com/gimme";
const section = document.querySelector(".catcontainer");
const button = document.querySelector(".catbtn");

console,console.log();


button.addEventListener("click", getRandomCats);

randomCatPhoto = (json) => {
  let photo = json.url;
  section.classList.add("cats");

  let image = document.createElement("img");
  image.src = photo;
  image.classList.add("random_cats");
  image.alt = photo;
  section.appendChild(image);
};

async function getRandomCats() {
  section.innerHTML = "";
  try {
    const catresponse = await fetch(url);
    const json = await catresponse.json();
    console.log("JSON:", json);
    return randomCatPhoto(json);
  } catch (e) {
    console.log("This is an error");
    console.log(e);
  }
}
function createSmoke() {
  const smokeContainer = document.getElementById('response');
  const containerSize = smokeContainer.clientWidth;
  
  for (let i = 0; i < 500; i++) { // Generate multiple smoke particles
      let smoke = document.createElement('div');
      smoke.classList.add('smoke');

      // Random position inside the container (expanded boundary)
      let startX = (Math.random() - 0.5) * containerSize * 2; // Anywhere around (-100%, +100%)
      let startY = (Math.random() - 0.5) * containerSize * 2;

      // Move toward a random point outside
      let targetX = Math.random() * containerSize * 2 + (containerSize * 0.1);
      let targetY = Math.random() * containerSize * 2 + (containerSize * 0.1);

      // Apply position
      smoke.style.left = `${startX}px`;
      smoke.style.top = `${startY}px`;
      smoke.style.position = "static";

      // Animate movement using JavaScript
      smoke.animate([
          { transform: `translate(0, 0) scale(2)`, opacity: 0.5 },
          { transform: `translate(${targetX - startX}px, ${targetY - startY}px) scale(0.2)`, opacity: 0.1 }
      ], {
          duration: 20000,
          easing: "ease-in",
          fill: "forwards"
      });

      smokeContainer.appendChild(smoke);

      // Remove after animation
      setTimeout(() => {
          smoke.remove();
      }, 10000);
  }
}
