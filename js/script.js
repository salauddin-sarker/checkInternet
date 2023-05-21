const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".desc"),
reconnectBtn = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 10;

const checkConnection = async () => {
    try {
        // try to fetch random data from the API. If the status code is between 
        // 200 and 300, the network connection is considerd online
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
    }catch (error) {
        isOnline = false; //If there an error, the connection is considerd offline
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    // If the status is true (online), update icon, title, and description accordingly
    if(status) {
        wifiIcon.className = "fa-solid fa-wifi";
        popupTitle.innerText = "Restore Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"),2000);
    }
    wifiIcon.className = "fa-solid fa-globe";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Your network is unavailable. we will attempt to reconnect you in <b>10</b> seconds.";
    popup.className = " popup show";
    intervalId = setInterval (() => {
        //  set interval to decrease the timer by 1 every second
        timer--;
        if(timer === 0)checkConnection(); // if the timer reaches 0, check the connection agin
        popup.querySelector(".desc b").innerText = timer; 
    },1000);
}
// only if isOnline is true, check the connectioin status every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);

reconnectBtn.addEventListener("click",checkConnection);