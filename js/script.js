


  const scrollContainer = document.getElementById('scroll-container');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) { // 페이지가 스크롤되면
      scrollContainer.classList.add('shrink'); // 요소의 클래스에 'shrink' 클래스 추가
    } else {
      scrollContainer.classList.remove('shrink'); // 스크롤이 맨 위에 있으면 'shrink' 클래스 제거
    }
  });

  function showContent(contentId) {
    // 모든 컨텐츠 숨기기
    var contents = document.getElementsByClassName('content');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active-content');
    }
    // 선택된 컨텐츠 보여주기
    document.getElementById(contentId).classList.add('active-content');
}









document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.submit').addEventListener('click', sendMessage);
});

  // 폼 제출 이벤트 리스너
  function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    if (name && email && message) {
      // Firebase에 데이터 저장
      firebase.database().ref('messages').push({
        name: name,
        email: email,
        message: message,
        timestamp: Date.now()
      }).then(() => {
        document.getElementById('success-message').style.display = 'block';
        setTimeout(() => {
          document.getElementById('success-message').style.display = 'none';
        }, 3000);
        // 확인 메시지 표시
        alert("메시지가 전송되었습니다!");
        // 폼 초기화
        document.getElementById('contact-form').reset();
      }).catch((error) => {
        console.error('Error writing new message to Firebase Database', error);
      });
    }
  }

  // Firebase 데이터베이스 실시간 업데이트 리스너
  firebase.database().ref('messages').on('child_added', function(snapshot) {
    const message = snapshot.val();
    displayMessage(message.name, message.email, message.message);
  });

  // 메시지 표시 함수
  function displayMessage(name, email, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${name}</strong> (${email}): <p>${message}</p>`;
    document.getElementById('messages').appendChild(messageDiv);
  }