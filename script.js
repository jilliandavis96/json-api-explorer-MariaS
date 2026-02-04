// Cache DOM elements
const fetchButton = document.getElementById('fetchButton');
const postList = document.getElementById('postList');
const errorDiv = document.getElementById('error');
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('titleInput');
const bodyInput = document.getElementById('bodyInput');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');

// TASK 1: Fetch and Display Posts
function fetchPosts() {
    // Show loading message
    postList.innerHTML = '<p>Loading...</p>';
    errorDiv.innerHTML = '';
    
    // Fetch posts from API
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function(response) {
            return response.json();
        })
        .then(function(posts) {
            // Clear loading message
            postList.innerHTML = '';
            
            // Display each post
            posts.forEach(function(post) {
                const postDiv = document.createElement('div');
                postDiv.style.border = '1px solid #ccc';
                postDiv.style.padding = '10px';
                postDiv.style.marginBottom = '10px';
                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                postList.appendChild(postDiv);
            });
        })
        .catch(function(error) {
            // Show error message if fetch fails
            postList.innerHTML = '';
            errorDiv.innerHTML = `<p style="color: red;">Error loading posts: ${error.message}</p>`;
        });
}

// Add event listener to fetch button
fetchButton.addEventListener('click', fetchPosts);

// TASK 2: Create and Send a New Post
postForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear previous messages
    formError.innerHTML = '';
    formSuccess.innerHTML = '';
    
    // Show loading message
    formSuccess.innerHTML = '<p>Submitting...</p>';
    
    // Create post data object
    const newPost = {
        title: titleInput.value,
        body: bodyInput.value,
        userId: 1
    };
    
    // Send POST request
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Show success message
            formSuccess.innerHTML = `
                <p style="color: green;">Post created successfully!</p>
                <p><strong>Post ID:</strong> ${data.id}</p>
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Body:</strong> ${data.body}</p>
            `;
            
            // Clear form
            titleInput.value = '';
            bodyInput.value = '';
        })
        .catch(function(error) {
            // Show error message
            formSuccess.innerHTML = '';
            formError.innerHTML = `<p style="color: red;">Error creating post: ${error.message}</p>`;
        });
});
