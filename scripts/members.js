export async function loadMembers() {
  const jsFile = "./data/members.json";
  try {
    const response = await fetch(jsFile);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const members = await response.json();
    renderMembers(members);
    // Load GIF that takes longer to load
    const gifImage = document.getElementById("bigGifImage");
    gifImage.style.display = "block";
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function renderMembers(membersData) {
  const memberContainer = document.querySelector(".members-container .members");
  if (!memberContainer) {
    console.error("Error: Member container not found.");
    return; // Stop execution if container is missing
  }
  membersData.forEach((member) => {
    const memberElement = document.createElement("div");
    memberElement.classList.add("member");
    memberElement.innerHTML = `
            <div class="image">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="details">
                <div class="name">${member.username}</div>
                <div class="role">${member.role}</div>
                <div class="bio">${member.bio}</div>
            </div>
        `;
    memberContainer.appendChild(memberElement);
  });
}
