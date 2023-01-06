let postsFetchCursor = "1";
const postsSection = document.getElementById("posts")

function getNextPosts(cursor) {
    return new Promise((resolve) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", `static/posts_${cursor}.json`, true)
        xhttp.send();
        xhttp.onload = e => resolve(JSON.parse(e.currentTarget.responseText))
    });
}

function generatePostDOM(postData) {
    const post = document.createElement("div");
    post.className = "block--post mixin--dashed-border--full";
    post.innerHTML = `<h2>${postData.title}</h2>
    <p>${postData.content}</p>`
    return post
}

function loadMore() {
    getNextPosts(postsFetchCursor).then((posts) => {
        posts.edges.forEach((post) => {
            const posts = document.querySelectorAll(".block--post");
            posts[posts.length - 1].parentNode.insertBefore(generatePostDOM(post), posts[posts.length - 1].nextSibling);
        })
        if (!posts.nextCursor) document.getElementById("load-more").setAttribute("disabled", "true")
        postsFetchCursor = posts.nextCursor
    }).catch((e) => null)
}
function generateLoadMoreButtonDOM() {
    const button = document.createElement('button')
    button.id = "load-more"
    button.innerText = "Load more"
    button.className = "button action--load-more"
    button.onclick = loadMore
    return button
}

function initialPostsRender() {
    getNextPosts(postsFetchCursor).then((posts) => {
        posts.edges.forEach((post) => {
            postsSection.appendChild(generatePostDOM(post));
        })
        postsSection.appendChild(generateLoadMoreButtonDOM());
        if (!posts.nextCursor) document.getElementById("load-more").setAttribute("disabled", "true")
        postsFetchCursor = posts.nextCursor
    }).catch((e) => null)
}

( () => initialPostsRender())()