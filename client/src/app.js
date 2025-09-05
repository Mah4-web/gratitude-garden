const gratitudeForm = document.getElementById('gratitudeForm');
const postContainer = document.getElementById('postContainer');
const newSproutsContainer = document.getElementById('newSproutsContainer');
const topPostsContainer = document.getElementById('topPosts');
const notification = document.getElementById('notification');

// Show notification message (success or error)
function showNotification(message, isError = false) {
  notification.textContent = message;
  notification.classList.remove('hidden');
  notification.style.backgroundColor = isError ? '#f8d7da' : '#d4edda';
  notification.style.color = isError ? '#842029' : '#155724';
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 3000);
}

// Handle form submission
gratitudeForm.addEventListener('submit', async event => {
  event.preventDefault();

  const formValues = {
    name: gratitudeForm.name.value.trim(),
    message: gratitudeForm.message.value.trim(),
    emoji: gratitudeForm.emoji.value,
    mood_tag: gratitudeForm.mood_tag.value.trim(),
  };

  try {
    const res = await fetch('http://localhost:2025/gratitudeWall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formValues }),
    });

    if (res.ok) {
      showNotification('🌷 Your gratitude message was planted!');
      gratitudeForm.reset();
      await loadPosts();
      await loadNewSprouts();
      await loadStats();
    } else {
      showNotification('❌ Something went wrong. Try again.', true);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    showNotification('❌ Network error. Please try again.', true);
  }
});

// Helper: Get plant emoji based on likes count
function getPlantEmoji(likes) {
  if (likes >= 10) return '🌼';
  if (likes >= 5) return '🌸';
  if (likes >= 1) return '🍃';
  return '🌱';
}

// Helper: Get growth class based on likes count
function getGrowthClass(likes) {
  if (likes >= 10) return 'bloomed';
  if (likes >= 5) return 'medium-growth';
  if (likes >= 1) return 'small-growth';
  return 'normal-growth';
}

// Render posts into a container
const renderPosts = (posts, container) => {
  container.innerHTML = '';
  posts.forEach(post => {
    const plantEmoji = getPlantEmoji(post.likes);

    const card = document.createElement('article');
    card.classList.add('flower-card');

    // Add initial growth class based on likes
    card.classList.add(getGrowthClass(post.likes));

    card.innerHTML = `
      <div class="flower-image">${plantEmoji}</div>
      <div class="flower-top">
        <span class="emoji">${post.emoji || '🌱'}</span>
        <span class="name">${post.name}</span>
      </div>
      <p class="message">${post.message}</p>
      <button class="like-btn" data-post="${post.id}" title="Click to spread some sunshine!">
        ☀️ Give Sunshine (<span class="like-count">${post.likes}</span>)
      </button>
    `;

    // Like button click handler
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', async () => {
      const countSpan = likeBtn.querySelector('.like-count');
      let count = parseInt(countSpan.textContent, 10);
      count++;

      // Update UI immediately
      countSpan.textContent = count;
      likeBtn.classList.add('sunny');

      // Update growth class and plant emoji
      card.classList.remove('normal-growth', 'small-growth', 'medium-growth', 'bloomed');
      const newGrowthClass = getGrowthClass(count);
      card.classList.add(newGrowthClass);
      card.querySelector('.flower-image').textContent = getPlantEmoji(count);

      try {
        const res = await fetch(`http://localhost:2025/gratitudeWall/${likeBtn.getAttribute('data-post')}/like`, {
          method: 'POST',
        });
        if (!res.ok) throw new Error('Failed to like message');
      } catch (error) {
        console.error(error);
        // Revert UI on error
        count--;
        countSpan.textContent = count;
        likeBtn.classList.remove('sunny');

        // Revert growth class and emoji
        card.classList.remove('normal-growth', 'small-growth', 'medium-growth', 'bloomed');
        card.classList.add(getGrowthClass(count));
        card.querySelector('.flower-image').textContent = getPlantEmoji(count);

        showNotification('❌ Could not give sunshine. Try again.', true);
      }
    });

    container.appendChild(card);
  });
};

// Load all posts (Garden Wall)
async function loadPosts() {
  try {
    const res = await fetch('http://localhost:2025/gratitudeWall');
    if (!res.ok) throw new Error('Failed to load posts');
    const posts = await res.json();
    renderPosts(posts, postContainer);
  } catch (error) {
    console.error(error);
  }
}

// Load new sprouts (recent posts)
async function loadNewSprouts() {
  try {
    const res = await fetch('http://localhost:2025/new-sprouts');
    if (!res.ok) throw new Error('Failed to load new sprouts');
    const posts = await res.json();
    renderPosts(posts, newSproutsContainer);
  } catch (error) {
    console.error(error);
  }
}

// Load garden stats (Growth Tracker)
async function loadStats() {
  try {
    const res = await fetch('http://localhost:2025/stats');
    if (!res.ok) throw new Error('Failed to load stats');
    const stats = await res.json();
    document.getElementById('msgCount').textContent = stats.messages;
    document.getElementById('likeCount').textContent = stats.likes;
  } catch (error) {
    console.error(error);
  }
}

// Initial load
loadPosts();
loadNewSprouts();
loadStats();
