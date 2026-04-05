const titles = document.querySelectorAll(".card");

titles.forEach(title=>{
  title.addEventListener("click", ()=>{
    const item = title.parentElement;
    const arrow = title.querySelector(".arrow");

    item.classList.toggle("open");

    if(item.classList.contains("open")){
      arrow.textContent = "▲";
    }else{
      arrow.textContent = "▼";
    }
  });
});


// 전체 펼치기
document.getElementById("openAll").onclick = ()=>{
  document.querySelectorAll(".choice-card").forEach(item=>{
    item.classList.add("open");
    item.querySelector(".arrow").textContent = "▲";

    document.getElementById("closeAll").style.display = "flex";
    document.getElementById("openAll").style.display = "none";
  });
};

// 전체 닫기
document.getElementById("closeAll").onclick = ()=>{
  document.querySelectorAll(".choice-card").forEach(item=>{
    item.classList.remove("open");
    item.querySelector(".arrow").textContent = "▼";

    document.getElementById("closeAll").style.display = "none";
    document.getElementById("openAll").style.display = "flex";
  });
};