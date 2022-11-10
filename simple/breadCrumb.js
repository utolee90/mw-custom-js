/*
 * written By. LiteHell and modified by Utolee90
 * Warning : This script uses localStorage of your browser so BREADCUMB WILL BE DELETED IF YOU CLEAR STORAGE DATA FROM YOUR BROWSER.
 */
if (mw.config.exists("wgIsArticle") && mw.config.exists("wgPageName") && mw.config.exists("wgArticlePath")) {
    var conf = mw.config.get(["wgIsArticle", "wgPageName", "wgArticlePath"]);
    if (conf.wgIsArticle) {
        var itemName = "pageBreadcumbs";

        function initStorageIfRequired() {
            if (localStorage.getItem(itemName) == null)
                localStorage.setItem(itemName, "[]");
        }

        function setStorage(value) {
            initStorageIfRequired();
            localStorage.setItem(itemName, JSON.stringify(value.slice(-20)));
        }

        function getStorage() {
            initStorageIfRequired();
            return JSON.parse(localStorage.getItem(itemName));
        }

        function makeBreadBar(arr, active) {
            var ol = document.createElement("ol");
            ol.className = "breadcrumb";
            ol.style.height = "fit-content"; // 높이 결정
            ol.innerHTML = '<li id="cleanBreads"><a href="javascript:(function(){})();" style="color: red;"><span class="fa fa-trash"></span></a></li>';
            ol.querySelector('li#cleanBreads > a').addEventListener("click", function() {
                if (confirm("진짜로 빵가루를 전부다 청소할까요?")) {
                    localStorage.setItem(itemName, "[]");
                    alert('강제 새로고침하면 지워져 있을겁니다. :)');
                }
            });
            // 최근 10개만 역순으로 제작. 중복이 있으면 제외
            var limitCnt = 10;
            var newArr = [];
            var j = 0;
            while (newArr.length < Math.min(limitCnt, arr.length) && j<=arr.length-1) {
                if (newArr.indexOf(arr[arr.length-1-j]) ==-1) {
                    newArr.push(arr[arr.length-1-j]);
                }
                j++;
            }
            for (var i = 0; i < newArr.length; i++) {
                var now = newArr[i];
                var li = document.createElement("li");
                if (now == active) {
                    li.className = "active";
                    li.textContent = now;
                } else {
                    var anchor = document.createElement("a");
                    anchor.href = conf.wgArticlePath.replace('$1', now);
                    anchor.title = now;
                    anchor.textContent = now;
                    li.appendChild(anchor);
                }
                ol.appendChild(li);
            }
            return ol;
        }

        var articles = getStorage();
        if(articles.length == 0 || (articles.length != 0 && articles[articles.length - 1] != conf.wgPageName)) articles.push(conf.wgPageName);
        setStorage(articles, conf.wgPageName);
        var breadbar = makeBreadBar(articles, conf.wgPageName);
        var headerAds = document.querySelector(".header-ads");
        headerAds.parentNode.insertBefore(breadbar, headerAds); // 광고 위에 삽입하기
    }
}
