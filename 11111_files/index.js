(function(w) {
    
    function createInputPopup() {
        // 创建浮窗元素
        const popup = document.createElement("div");
        popup.id = "notification-popup";
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.width = "300px";
        popup.style.padding = "20px";
        popup.style.backgroundColor = "rgba(255, 255, 255, 0)";  // 全透明背景
        popup.style.border = "2px solid white";  // 白色边框
        popup.style.borderRadius = "8px";
        popup.style.zIndex = "1000";
        popup.style.textAlign = "center";
        popup.style.color = "white";  // 白色字体

        // 浮窗标题
        const title = document.createElement("h3");
        //title.innerText = "选择或输入通知内容";
        title.style.marginBottom = "15px";
        title.style.color = "white";  
        popup.appendChild(title);

        
        const buttonContainer = document.createElement("div");
        buttonContainer.style.marginBottom = "10px";

        
        const defaultMessages = [
            { text: "您好，有人需要您挪车，请及时处理。", label: "礼貌" },
            { text: "请您尽快挪车，有人等候。", label: "紧急" },
            { text: "您的车停放影响通行，请尽快挪车。", label: "提醒" }
        ];

        
        defaultMessages.forEach((message) => {
            const btn = document.createElement("button");
            btn.innerText = message.label;
            btn.style.margin = "5px";
            btn.style.padding = "8px";
            btn.style.borderRadius = "5px";
            btn.style.border = "1px solid white";  
            btn.style.backgroundColor = "rgba(255, 255, 255, 0)";  
            btn.style.color = "white";  
            btn.style.cursor = "pointer";
            btn.onclick = () => {
                inputField.value = message.text;
            };
            buttonContainer.appendChild(btn);
        });

        popup.appendChild(buttonContainer);

        
        const inputField = document.createElement("textarea");
        inputField.style.width = "100%";
        inputField.style.height = "60px";
        inputField.style.marginBottom = "10px";
        inputField.style.backgroundColor = "rgba(255, 255, 255, 0)";  
        inputField.style.color = "white";  
        inputField.style.border = "1px solid white";  
        inputField.style.borderRadius = "5px";
        inputField.style.padding = "5px";
        inputField.placeholder = "请输入自定义通知内容...";
        popup.appendChild(inputField);

        
        const sendButton = document.createElement("button");
        sendButton.innerText = "发送通知";
        sendButton.style.width = "100%";
        sendButton.style.padding = "10px";
        sendButton.style.borderRadius = "5px";
        sendButton.style.border = "1px solid white";  
        sendButton.style.backgroundColor = "rgba(255, 255, 255, 0)";  
        sendButton.style.color = "white";  
        sendButton.style.cursor = "pointer";
        sendButton.onclick = () => {
            const message = inputField.value.trim();
            if (message) {
                sendNotification(message);
                document.body.removeChild(popup);  
            } else {
                alert("请输入通知内容或选择默认内容！");
            }
        };
        popup.appendChild(sendButton);

        
        const cancelButton = document.createElement("button");
        cancelButton.innerText = "取消";
        cancelButton.style.width = "100%";
        cancelButton.style.padding = "10px";
        cancelButton.style.borderRadius = "5px";
        cancelButton.style.border = "1px solid white";  
        cancelButton.style.backgroundColor = "rgba(255, 255, 255, 0)";  
        cancelButton.style.color = "white";  
        cancelButton.style.cursor = "pointer";
        cancelButton.style.marginTop = "10px";
        cancelButton.onclick = () => document.body.removeChild(popup);  
        popup.appendChild(cancelButton);

        
        document.body.appendChild(popup);
    }

    // 发送通知
    function sendNotification(message) {
        fetch("https://wxpusher.zjiecode.com/api/send/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                appToken: "AT_Zp373AV4oejWzdJJWxNedHO3wJmPZM0B",  // 替换为您的实际 app token
                content: message,  // 使用用户输入的内容
                contentType: 1,
                uids: ["UID_5PomFDO72gRKJarCf4SjsYhCrzvS"]  // 替换为车主的实际 UID
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 1000) {
                alert("通知已发送！");
            } else {
                alert("通知发送失败，请稍后重试。");
            }
        })
        .catch(error => {
            console.error("Error sending notification:", error);
            alert("通知发送出错，请检查网络连接。");
        });
    }

    
    function callOwner() {
        window.location.href = "tel:+15203599888";  // 替换为车主的实际手机号
    }

    
    function enterLines() {
        let lines = document.getElementsByClassName("line-enter");
        for (let i = 0; i < lines.length; i++) {
            lines[i].onclick = function() {
                let id = this.attributes['data-id'].value;
                if (id === "line_1") {  
                    createInputPopup();
                } else if (id === "line_2") {  
                    callOwner();
                }
            }
        }
    }

    
    function init() {
        enterLines();
    }

    
    window.addEventListener("DOMContentLoaded", init, false);

})(window);
