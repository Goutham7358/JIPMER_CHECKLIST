let curr_num;
function on(num) {
  document.getElementsByClassName("dropdown-content")[num].style.display = "block";
  curr_num=num;
}

function off() {
  document.getElementsByClassName("dropdown-content")[curr_num].style.display = "none";
}
