const DATABASE_URL = 'https://gratitude-garden.onrender.com';

const gratitudeForm = document.getElementById('gratitudeForm');
const postContainer = document.getElementById('postContainer');
const newSproutsContainer = document.getElementById('newSproutsContainer');
const topPostsContainer = document.getElementById('topPosts');
const notification = document.getElementById('notification');

const successMessages = [
  "🌱 Your gratitude seed has been planted! Watch it grow!",
  "🌷 Thanks for planting some positivity!",
  "🌻 Your message just blossomed in the garden!",
  "🍃 You’ve just watered a seed of kindness!",
  "🌿 Your gratitude is taking root—thank you!",
  "🌸 Another beautiful bloom added to the garden!",
  "🌼 You’ve helped the garden grow brighter today!"
];

// Notification message
function showNotification(isError = false, customMessage = '') {
  const message = customMessage || (isError
    ? "❌ Something went wrong. Try again."
    : successMessages[Math.floor(Math.random() * successMessages.length)]
  );

  notification.textContent = message;
  notification.classList.remove('hidden');
  notification.classList.add('show');
  notification.style.backgroundColor = isError ? '#f8d7da' : '#d4edda';
  notification.style.color = isError ? '#842029' : '#155724';

  setTimeout(() => {
    notification.classList.remove('show');
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
    const res = await fetch(`${DATABASE_URL}/gratitudewall`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formValues }),
    });

    if (res.ok) {
      showNotification();
      gratitudeForm.reset();
      await loadPosts();
      await loadNewSprouts();
      await loadStats();
    } else {
      showNotification(true);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    showNotification(true);
  }
});

// Plant emoji based on likes count
function getPlantEmoji(likes) {
  if (likes >= 10) return '🌼';
  if (likes >= 5) return '🌸';
  if (likes >= 1) return '🍃';
  return '🌱';
}

// Growth class based on likes count
function getGrowthClass(likes) {
  if (likes >= 10) return 'bloomed';
  if (likes >= 5) return 'medium-growth';
  if (likes >= 1) return 'small-growth';
  return 'normal-growth';
}

const renderPosts = (posts, container) => {
  container.innerHTML = '';
  posts.forEach(post => {
    const plantEmoji = getPlantEmoji(post.likes);

    const card = document.createElement('article');
    card.classList.add('flower-card', getGrowthClass(post.likes));
    card.style.position = 'relative';

    // Format the created_at date nicely
    const createdDate = new Date(post.created_at);
    console.log('Raw created_at:', post.created_at);
    console.log('Parsed date:', createdDate);

    let formattedDate;
    if (isNaN(createdDate)) {
      console.warn('Invalid date detected!');
      formattedDate = 'Unknown date';
    } else {
      formattedDate = createdDate.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    card.innerHTML = `
      <button class="delete-btn" data-id="${post.id}" title="Delete this message" aria-label="Delete message">✖️</button>
      <div class="flower-image">${plantEmoji}</div>
      <div class="flower-top">
        <span class="emoji">${post.emoji || '🌱'}</span>
        <span class="name">${post.name}</span>
      </div>
      <p class="message">${post.message}</p>
      <div class="date">${formattedDate}</div>
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
      card.classList.add(getGrowthClass(count));
      card.querySelector('.flower-image').textContent = getPlantEmoji(count);

      try {
        const res = await fetch(`${DATABASE_URL}/gratitudewall/${likeBtn.getAttribute('data-post')}/like`, {
          method: 'POST',
        });
        if (!res.ok) throw new Error('Failed to like message');
      } catch (error) {
        console.error(error);
        // Revert UI on error
        count--;
        countSpan.textContent = count;
        likeBtn.classList.remove('sunny');

        card.classList.remove('normal-growth', 'small-growth', 'medium-growth', 'bloomed');
        card.classList.add(getGrowthClass(count));
        card.querySelector('.flower-image').textContent = getPlantEmoji(count);

        showNotification(true);
      }
    });

    // Delete button handler with fade-out and confirmation
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to delete this message?')) return;

      // Animate fade out
      card.classList.add('fade-out');

      // Wait for fade-out transition before deleting
      card.addEventListener('transitionend', async () => {
        try {
          const res = await fetch(`${DATABASE_URL}/gratitudewall/${post.id}`, {
            method: 'DELETE',
          });

          if (!res.ok) throw new Error('Failed to delete message');

          card.remove();
          showNotification(false, 'Message deleted successfully!');
          await loadStats();
        } catch (error) {
          console.error(error);
          showNotification(true, 'Failed to delete message.');
          card.classList.remove('fade-out'); // revert animation on error
        }
      }, { once: true });
    });

    container.appendChild(card);
  });
};

// Load all posts (Garden Wall)
async function loadPosts() {
  try {
    const res = await fetch(`${DATABASE_URL}/gratitudewall`);
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
    const res = await fetch(`${DATABASE_URL}/gratitudewall?limit=5&sort=desc`);
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
    const res = await fetch(`${DATABASE_URL}/stats`);
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
