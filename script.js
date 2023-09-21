// script.js

async function fetchProfile() {
    const username = "kishor-rajbanshi"; // Replace with your GitHub username
    const readmeContent = document.getElementById("readme-content");
    const profileImage = document.querySelector(".profile-image");

    try {
        // Fetch profile details from GitHub API
        const profileResponse = await fetch(`https://api.github.com/users/${username}`);
        const profileData = await profileResponse.json();

        if (profileResponse.ok) {
            // Update profile information
            document.getElementById("username").textContent = profileData.login;
            document.getElementById("bio").textContent = profileData.bio || "";
            document.getElementById("location").textContent = profileData.location || "";
            document.getElementById("followers").textContent = `Followers: ${profileData.followers} | Following: ${profileData.following}`;
            document.getElementById("email").textContent = profileData.email || "";
            document.getElementById("website").innerHTML = profileData.blog
                ? `<a href="${profileData.blog}">${profileData.blog}</a>`
                : "N/A";
            document.getElementById("twitter").innerHTML = profileData.twitter_username
                ? `<a href="https://twitter.com/${profileData.twitter_username}">@${profileData.twitter_username}</a>`
                : "N/A";
            const joinDate = new Date(profileData.created_at);
            document.getElementById("join-date").textContent = `Joined GitHub: ${joinDate.toDateString()}`;
            profileImage.src = profileData.avatar_url;
        }

        // Fetch and render README
        const readmeResponse = await fetch(
            `https://raw.githubusercontent.com/${username}/${username}/main/README.md`
        );

        if (readmeResponse.ok) {
            const readmeText = await readmeResponse.text();
            readmeContent.innerHTML = marked(readmeText);
        } else {
            readmeContent.innerHTML =
                "README not found or there was an issue with the request.";
        }
    } catch (error) {
        readmeContent.innerHTML = "An error occurred: " + error.message;
    }
}

// Call the fetchProfile function after marked.js is loaded
window.addEventListener("DOMContentLoaded", fetchProfile);
