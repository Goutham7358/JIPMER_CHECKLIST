function on(num) {
  document.getElementsByClassName("dropdown-content")[num].style.display = "block";
  curr_num=num;
}

function off(num) {
  document.getElementsByClassName("dropdown-content")[num].style.display = "none";
}
