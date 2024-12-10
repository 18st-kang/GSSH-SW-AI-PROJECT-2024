let items_switchitems = [
    `
    <span class="right-top2">
        <span class="right-top-upper">
            댓글
            <i class="ri-close-line" onclick="closeComment()"></i>
        </span><br>
        <li class="comments"></li>
        <form id="addComment">
            <i class="ri-attachment-2" onclick="document.getElementById('fileInput').click();"></i>
            <label for="fileInput">
                <input type="file" id="fileInput">
            </label>
                <textarea type="text" class="commentText"></textarea>
            <input type="submit" class="button" value="업로드" />
        </form>
    </span>
    `,
    `
    <span class="right-top1">
        <form id="addSubmit">
            <div class="right-top-upper">
                <span>답안 입력</span>
                <i class="ri-attachment-2" onclick="document.getElementById('submitFileInput').click();"></i>
                <label for="submitFileInput">
                    <input type="file" id="submitFileInput"onchange="preview()"/>
                </label>
                <input type="submit" value="제출"/>
            </div>
            <div class="submitContainer">
                <textarea type="text" class="submitText"></textarea>
                <div id="submit-preview"></div>
            </div>
        </form>
    </span>
    `
];

let items_comment = [
    `
    <i class="ri-message-2-line" onclick="switchitems()"></i>
    `,
    `
    <i class="ri-message-2-fill" onclick="switchitems()"></i>
    `
];

let currentIndex_switchitems = 0;

function switchitems() {
    currentIndex_switchitems = (currentIndex_switchitems + 1) % items_switchitems.length;
    document.querySelector('.comment').innerHTML = items_comment[currentIndex_switchitems];
    document.querySelector('.right-top').innerHTML = items_switchitems[currentIndex_switchitems];
}

function closeComment(){
    document.querySelector('.right-top').innerHTML = items_switchitems[1];
}

//like
let items_like = [
    `
    <i class="ri-heart-3-line" onclick="switchitems_like()"></i>
    `,
    `
    <i class="ri-heart-3-fill" onclick="switchitems_like()"></i>
    `
];

let currentIndex_like = 0;

function switchitems_like() {
    currentIndex_like = (currentIndex_like + 1) % items_like.length;
    document.querySelector('.heart').innerHTML = items_like[currentIndex_like];
}

//bookmark
let items_bookmark = [
    `
    <i class="ri-bookmark-line" onclick="switchitems_bookmark()"></i>
    `,
    `
    <i class="ri-bookmark-fill" onclick="switchitems_bookmark()"></i>
    `
];

let currentIndex_bookmark = 0;

function switchitems_bookmark() {
    currentIndex_bookmark = (currentIndex_bookmark + 1) % items_bookmark.length;
    document.querySelector('.bookmark').innerHTML = items_bookmark[currentIndex_bookmark];
}

//comment
const commentBtn = document.getElementById('addComment');
const commentList = [];
const commentContainer = document.querySelector(".comments");
const input = document.querySelector('.commentText');
const fileInput = document.getElementById('fileInput');

let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let date = `${year}-${month}-${day}`;
let userid = 'oi02430';

let currentReplyIndex = null;
let selectedFiles = [];

function Comment(content) {
    this.userid = userid;
    this.content = content;
    this.date = date;
    this.replies = [];
    this.files = [];
}

function createRow(userid, content, date, index, files = [], isReply = false) {
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const div1 = document.createElement("div");
    const btn = document.createElement("span");
    const hr1 = document.createElement("hr");
    
    ul.setAttribute("class", isReply ? "moreComment-row" : "comment-row");
    li1.setAttribute("class", "comment-userid");
    li2.setAttribute("class", "comment-date");
    div1.setAttribute("class", "comment-content");
    btn.setAttribute("class", "moreComment-button");
    
    li1.innerHTML = userid;
    li2.innerHTML = date;
    div1.innerHTML = content;
    btn.innerHTML = "답글 달기";
    
    ul.append(li1, li2, div1, btn, hr1);

    // 파일 미리보기 추가
    if (files.length > 0) {
        files.forEach(file => {
            if (file.type.startsWith("image/")) {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const img = new Image();
                img.onload = function() {
                    canvas.width = 200;
                    canvas.height = (img.height / img.width) * 200;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = URL.createObjectURL(file);
                div1.append(canvas);
                const div2 = document.createElement("div");
                div2.setAttribute("class", "file-name");
                commentBtn.append(div2);
            } else {
                const fileDiv = document.createElement("div");
                fileDiv.textContent = file.name;
                div1.append(fileDiv);
            }
        });
    }

    if (!isReply) {
        const moreCommentContainer = document.createElement("li");
        moreCommentContainer.setAttribute("class", "moreComments");
        ul.append(moreCommentContainer);

        btn.addEventListener("click", () => {
            switchToReplyMode(index);
        });
    }

    return ul;
}

function commentDrawing(container) {
    container.innerHTML = "";
    commentList.forEach((comment, index) => {
        const row = createRow(comment.userid, comment.content, comment.date, index, comment.files);
        container.append(row);

        const moreCommentContainer = row.querySelector(".moreComments");
        comment.replies.forEach(reply => {
            const replyRow = createRow(reply.userid, reply.content, reply.date, index, reply.files, true);
            moreCommentContainer.append(replyRow);
        });
    });
}

function commentHandler(e) {
    e.preventDefault();
    const input = document.querySelector('.commentText');
    if (input.value == "") {
        alert("내용을 입력하세요.");
        return;
    }

    const newComment = new Comment(input.value);
    newComment.files = selectedFiles;

    if (currentReplyIndex === null) {
        commentList.push(newComment);
    } else {
        commentList[currentReplyIndex].replies.push(newComment);
        switchToCommentMode();
    }

    commentDrawing(commentContainer);
    input.value = "";
    selectedFiles = [];
    fileInput.value = "";
}

fileInput.addEventListener('change', (e) => {
    selectedFiles = Array.from(e.target.files);
});

function switchToReplyMode(index) {
    currentReplyIndex = index;
    input.focus();
}

function switchToCommentMode() {
    currentReplyIndex = null;
}

commentBtn.addEventListener("submit", commentHandler);

//submit
function preview(){
    const fileTag = document.querySelector("input[id=submitFileInput]");
    const divTag = document.querySelector("#submit-preview");

    divTag.innerHTML = "";

    if(fileTag.files.length > 0){
        for(let i = 0; i < fileTag.files.length; ++i){
            let reader = new FileReader();
            reader.onload = function(data){
                let imgTag = document.createElement('img');

                imgTag.setAttribute('src', data.target.result);
                imgTag.setAttribute('width', '250');
                imgTag.setAttribute('height', '150');

                divTag.appendChild(imgTag);
            }
            reader.readAsDataURL(fileTag.files[i]);
        }    
    }else{
        divTag.innerHTML="";
    }
}

